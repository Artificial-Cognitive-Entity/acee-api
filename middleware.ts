// Without a defined matcher, this one line applies next-auth to the entire project
export { default } from "next-auth/middleware";

// protect only these pages
export const config = { matcher: ["/dashboard","/chat", "/search"] }