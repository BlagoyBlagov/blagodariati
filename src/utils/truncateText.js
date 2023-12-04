export const truncateText = (str, maxLength = 50) => {
    return str.length > maxLength ? str.substring(0, maxLength).trim() + '...' : str;
}