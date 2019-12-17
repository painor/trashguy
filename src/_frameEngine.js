// ============================================= //
//             Trash Guy Script                  //
//                 (> ^_^)>                      //
//          Made by Painor (t.me/painor)         //
//                                               //
// ============================================= // ========================== //
// Copyright (C) 2019 Painor (https://t.me/painor)                             //
// Permission is hereby granted, free of charge, to any person obtaining a     //
// copy of this software and associated documentation files (the "Software"),  //
// to deal in the Software without restriction, including without limitation   //
// the rights to use, copy, modify, merge, publish, distribute, sublicense,    //
// and/or sell copies of the Software, and to permit persons to whom the       //
// Software is furnished to do so, subject to the following conditions: The    //
// above copyright notice and this permission notice shall be included in all  //
// copies or substantial portions of the Software.                             //
// =========================================================================== //
function range(start, end, step = 1) {
    const len = Math.floor((end - start) / step) + 1
    return Array(len).fill().map((_, idx) => start + (idx * step))
}

function median(numbers) {
    const sorted = numbers.slice().sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2
    }

    return sorted[middle]
}


class FrameEngine {
    /**
     *
     * @param sprites
     * @param canvas {Array}
     * @returns {string}
     */
    static wrap(sprites, canvas) {
        const wrapper = [sprites.wrapper]
        if (sprites.wrapper) {
            return ''.join(wrapper + canvas.split() + wrapper)
        } else {
            return canvas.join("")
        }
    }

    static frameGroupValues(sprites) {
        const minFgSize = 6
        const maxFgSizeIndex = minFgSize + sprites.trashItems.length * 2
        const fgSizes = range(minFgSize + 1, maxFgSizeIndex + 1, 2)
        const totalFrameCount = fgSizes.reduce((a, b) => a + b, 0)
        return { fgSizes, totalFrameCount }
    }

    static converter(slc, spr, index) {
        const { fgSizes, totalFrameCount } = FrameEngine.frameGroupValues(spr)

        let tempFrameIndex = 0
        if (index - slc.frameStart < slc.framesMax) {
            for (let i = 0; i < fgSizes.length; i++) {
                const fg = range(2, fgSizes[i] + 2)
                const midFg = median(fg)
                const upperFg = fg.slice(0, midFg - 2)
                const lowerFg = [...upperFg.slice(0, -1).reverse(), 1, 0]
                for (const pos of upperFg) {
                    if (tempFrameIndex === index) {
                        return { position: pos, forward: true, itemIndex: i }
                    }
                    tempFrameIndex++
                }

                for (const pos of lowerFg) {
                    if (tempFrameIndex === index) {

                        return { position: pos, forward: false, itemIndex: i }
                    }

                    tempFrameIndex++
                }

            }
        } else {
            throw new Error('TrahsGuy index out of range <(v_v)> ')
        }
    }

    static getFrame(slc, spr, index) {
        const { position, forward, itemIndex } = FrameEngine.converter(slc, spr, index)
        const truncItems = spr.trashItems.slice(itemIndex)

        let missingItemsLen = 0
        for (const x of spr.trashItems.slice(0, itemIndex)) {
            missingItemsLen += x.length
        }

        const padding = Array(missingItemsLen).fill(spr.spacer)

        // Create a dynamic canvas while each item disappears
        let canvas = [spr.spriteTrash, ...Array(3).fill(spr.spacer), ...padding, ...truncItems]
        const itemTruncateLength = -truncItems.length
        const lastIndex = canvas.length - (-itemTruncateLength)

        if (itemIndex < spr.trashItems.length) {

            // Start sequence, forward motion, going right
            if (forward) {
                if (position < lastIndex) {
                    // Start from second space after the trash can
                    canvas[position] = spr.spriteRight

                    // Snapshot the frames of the animation going right
                    return FrameEngine.wrap(spr, canvas)
                } else {
                    // End of forward motion, look left with item
                    // Set item position in front of trash guy
                    canvas[position - 1] = canvas[lastIndex]
                    // Set position of trash guy where item was
                    canvas[position] = spr.spriteLeft
                    // Snapshot frame looking across at trash can
                    return FrameEngine.wrap(spr, canvas)
                }
            }
            // Reverse motion, going left
            else {
                // Going left with item towards trash can
                if (position > 0) {
                    canvas[position] = spr.spriteLeft

                    // Place item in front while not yet at the trash can
                    if (canvas[position - 1] !== spr.spriteTrash) {
                        canvas[position - 1] = canvas[lastIndex]

                        // Temporarily remove item from pile while holding it
                        canvas[lastIndex] = spr.spacer
                    } else {
                        // If trash can reached, replace spacing of missing item
                        if (spr.spacer.length === 1) {
                            const lastItemLen = canvas[lastIndex].length
                            canvas = [...canvas.slice(0, lastIndex), ...Array(lastItemLen).fill(spr.spacer), ...canvas.slice(lastIndex + 1)]
                        } else {
                            // Unknown spacer size, use as directed
                            canvas[lastIndex] = spr.spacer
                        }
                    }
                    // Snapshot the frames of the animation going left
                    return FrameEngine.wrap(spr, canvas)
                } else { // End of reverse motion, look right for one frame
                    canvas[position + 1] = spr.spriteRight

                    // Temporarily remove item from canvas for last frame also
                    if (spr.spacer === 1) {
                        const lastItemLen = canvas[lastIndex].length
                        canvas = [...canvas.slice(0, lastIndex), ...Array(lastItemLen).fill(spr.spacer), ...canvas.slice(lastIndex + 1)]
                    } else {
                        // Unknown spacer size, use as directed
                        canvas[lastIndex] = spr.spacer
                    }

                    // Snapshot the frame looking right
                    return FrameEngine.wrap(spr, canvas)
                }
            }
        }
    }
}

module.exports = FrameEngine
