export default function usersWithoutSelf(
  users: Map<string, string>,
  userId: string
) {
  return Array.from(users, ([id, name]) => ({ id, name }))
    .filter(({ id }) => id !== userId)
    .map(({ name }) => name);
}
