let sprites = {}

export function setSprites(key, value) {
    sprites[key] = value;
}

export function getetSprites(key) {
    return sprites[key]
}

export function getsetSpriteAll(){
    return sprites
}