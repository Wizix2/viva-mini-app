const tg = useTelegram();

useEffect(() => {
  if (!tg) return;
  
  tg.ready?.();
  tg.expand?.();
}, [tg]);
