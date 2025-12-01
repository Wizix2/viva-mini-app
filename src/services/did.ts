/**
 * D-ID API Service
 * Интеграция с D-ID API через официальный SDK и серверные маршруты
 */

// Типы для API
interface UploadResponse {
  source_image: string;
}

interface CreateAnimationResponse {
  id: string;
}

interface TaskStatusResponse {
  status: 'created' | 'processing' | 'done' | 'error';
  video_url?: string;
  error?: string;
}

// Сервис для работы с D-ID API
export const DIDService = {
  /**
   * Загружает изображение на сервер
   * @param file Файл изображения для загрузки
   * @returns URL загруженного файла
   */
  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/did/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as UploadResponse;
      return data.source_image;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  /**
   * Отправляет запрос на создание видео-анимации лица
   * @param sourceImage URL загруженного изображения
   * @returns ID задачи для отслеживания статуса
   */
  async createAnimation(sourceImage: string): Promise<string> {
    try {
      const response = await fetch('/api/did/animate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          source_image: sourceImage
        })
      });

      if (!response.ok) {
        throw new Error(`Animation creation failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as CreateAnimationResponse;
      return data.id;
    } catch (error) {
      console.error('Error creating animation:', error);
      throw error;
    }
  },

  /**
   * Проверяет статус задачи анимации
   * @param taskId ID задачи
   * @returns Статус задачи и URL видео (если готово)
   */
  async checkStatus(taskId: string): Promise<TaskStatusResponse> {
    try {
      const response = await fetch(`/api/did/status?task_id=${taskId}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as TaskStatusResponse;
      return data;
    } catch (error) {
      console.error('Error checking task status:', error);
      throw error;
    }
  },

  /**
   * Опрашивает API до завершения задачи
   * @param taskId ID задачи
   * @returns URL готового видео
   */
  async pollUntilDone(taskId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Функция для проверки статуса
      const checkTaskStatus = async () => {
        try {
          const statusResponse = await this.checkStatus(taskId);
          
          switch (statusResponse.status) {
            case 'done':
              if (statusResponse.video_url) {
                resolve(statusResponse.video_url);
              } else {
                reject(new Error('Task completed but no video URL provided'));
              }
              break;
            
            case 'error':
              reject(new Error(statusResponse.error || 'Task failed without specific error'));
              break;
            
            case 'created':
            case 'processing':
              // Продолжаем опрос через 3 секунды
              setTimeout(checkTaskStatus, 3000);
              break;
            
            default:
              reject(new Error(`Unknown task status: ${statusResponse.status}`));
          }
        } catch (error) {
          reject(error);
        }
      };

      // Запускаем первую проверку
      checkTaskStatus();
    });
  }
};

export default DIDService;