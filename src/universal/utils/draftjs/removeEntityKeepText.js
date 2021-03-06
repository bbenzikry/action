const updateBlockEntityRanges = (blocks, updatedKeyMap) => {
  const nextBlocks = []
  for (let ii = 0; ii < blocks.length; ii++) {
    const block = blocks[ii]
    const {entityRanges} = block
    const nextEntityRanges = []
    for (let jj = 0; jj < entityRanges.length; jj++) {
      const entityRange = entityRanges[jj]
      const nextKey = updatedKeyMap[entityRange.key]
      if (nextKey !== null) {
        nextEntityRanges.push({...entityRange, key: nextKey})
      }
    }
    nextBlocks.push({...block, entityRanges: nextEntityRanges})
  }
  return nextBlocks
}

/*
 * Removes the underlying entity but keeps the text in place
 * Useful for e.g. removing a mention but keeping the name
 */
const removeEntityKeepText = (rawContent, eqFn) => {
  const {blocks, entityMap} = rawContent
  const nextEntityMap = {}
  // oldKey: newKey. null is a remove sentinel
  const updatedKeyMap = {}
  const removedEntities = []
  // I'm not really sure how draft-js assigns keys, so I just reuse what they give me FIFO
  const releasedKeys = []
  const entityMapKeys = Object.keys(entityMap)
  for (let ii = 0; ii < entityMapKeys.length; ii++) {
    const key = entityMapKeys[ii]
    const entity = entityMap[key]
    if (eqFn(entity)) {
      removedEntities.push(entity)
      updatedKeyMap[key] = null
      releasedKeys.push(key)
    } else {
      const nextKey = releasedKeys.length ? releasedKeys.shift() : key
      nextEntityMap[nextKey] = entity
      updatedKeyMap[key] = nextKey
    }
  }

  return {
    rawContent:
      removedEntities.length === 0
        ? rawContent
        : {
          blocks: updateBlockEntityRanges(blocks, updatedKeyMap),
          entityMap: nextEntityMap
        },
    removedEntities
  }
}

export default removeEntityKeepText
