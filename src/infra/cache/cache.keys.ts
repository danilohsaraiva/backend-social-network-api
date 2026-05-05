export const CACHE_KEYS = {
    TIMELINE: (id: string, page: number, limit: number) => `timeline:${id}:page:${page}:limit:${limit}`,
    USER: (id: string) => `users:${id}`,
}