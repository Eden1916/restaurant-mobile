      const API_BASE = (process.env.EXPO_PUBLIC_API_URL ?? '').replace('/api', '')

   export function getImageUrl(image_url:string | null) {
    if(!image_url) return undefined;
    if(image_url.startsWith("/uploads/")) 
        return `${API_BASE}${image_url}`;
    return image_url;
  }
