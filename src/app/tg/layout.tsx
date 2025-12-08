export const dynamic = "force-dynamic";

export async function action() {
  "use server";
}

export default function TgLayout({ children }) {
  return (
    <div style={{
      background: "#000",
      color: "#fff",
      minHeight: "100vh"
    }}>
      {children}
    </div>
  );
}
