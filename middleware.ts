export { default } from 'next-auth/middleware'
// '/', '/hirings', '/details/[jobID]'
export const config = {matcher:['/jobs', '/hirings', '/details/[jobID]', '/profile', '/employer/profile', '/community', '/FAQ', '/settings', '/notifications']}