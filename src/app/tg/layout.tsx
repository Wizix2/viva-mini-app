export const metadata = {
  title: "VIVA TG Mini App",
};

export default function TgLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#0B0B0F", color: "white" }}>
        {children}
      </body>
    </html>
  );
}
