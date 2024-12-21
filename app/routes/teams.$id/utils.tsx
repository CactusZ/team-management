export function assertIdIsValid(id: number) {
  if (isNaN(id) || id < 1 || !id) {
    throw new Response("Invalid team ID", { status: 400 });
  }
}
