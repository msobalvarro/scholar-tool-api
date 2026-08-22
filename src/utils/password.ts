export const generateRandomPassword = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0; i < 4; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return password
}