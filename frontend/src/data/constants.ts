export const baseUrl = () => {
    if (!process.env.BACKEND_URL) {
        throw new Error("Backend URL not present")
    }

    return process.env.BACKEND_URL
}