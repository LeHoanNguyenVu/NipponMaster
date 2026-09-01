-- =============================================================================
-- Flyway Migration: V12 - Fix 404 Image URLs and Seed Strict Level Mnemonics
-- =============================================================================

-- Fix 404 image URLs in vocabularies table
UPDATE vocabularies SET image_url = 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&auto=format&fit=crop&q=80' WHERE word = 'か' AND word_type = 'ALPHABET';
UPDATE vocabularies SET image_url = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop&q=80' WHERE word = 'け' AND word_type = 'ALPHABET';
UPDATE vocabularies SET image_url = 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=400&auto=format&fit=crop&q=80' WHERE word = 'し' AND word_type = 'ALPHABET';
UPDATE vocabularies SET image_url = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&auto=format&fit=crop&q=80' WHERE word = 'す' AND word_type = 'ALPHABET';
UPDATE vocabularies SET image_url = 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=400&auto=format&fit=crop&q=80' WHERE word = 'た' AND word_type = 'ALPHABET';
UPDATE vocabularies SET image_url = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80' WHERE word = 'ろ' AND word_type = 'ALPHABET';
UPDATE vocabularies SET image_url = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80' WHERE word = 'だ' AND word_type = 'ALPHABET';
UPDATE vocabularies SET image_url = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80' WHERE word = 'ぴ' AND word_type = 'ALPHABET';
UPDATE vocabularies SET image_url = 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&auto=format&fit=crop&q=80' WHERE word = 'ワ' AND word_type = 'ALPHABET';

-- Fix 404 image URLs in kanjis table
UPDATE kanjis SET image_url = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&auto=format&fit=crop&q=80' WHERE character = '二';
UPDATE kanjis SET image_url = 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=400&auto=format&fit=crop&q=80' WHERE character = '六';
