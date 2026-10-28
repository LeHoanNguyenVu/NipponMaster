/**
 * Media URL Resolver for Production Cloud Assets (Supabase Storage CDN)
 */
export const SUPABASE_CDN_URL = 'https://bxqwarbeocbsfjieqbsq.supabase.co/storage/v1/object/public/kanji-assets';

/**
 * Chuyển đổi mọi đường dẫn asset cục bộ hoặc database sang link Supabase CDN công khai.
 * Đảm bảo 100% tương thích cả khi backend trả về đường dẫn cũ (/assets/kanji/...) lẫn mới (https://...).
 */
export const resolveKanjiAssetUrl = (url: string | null | undefined): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/assets/kanji/')) {
    const relativePath = url.replace('/assets/kanji/', '');
    return `${SUPABASE_CDN_URL}/${relativePath}`;
  }
  if (url.startsWith('assets/kanji/')) {
    const relativePath = url.replace('assets/kanji/', '');
    return `${SUPABASE_CDN_URL}/${relativePath}`;
  }
  return url;
};
