interface Props {
  name: string;
  task: string;
}
export default function TodoCard({ name, task }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h2>👤{name}</h2>
      <p>📝{task}</p>
    </div>
  );
}
