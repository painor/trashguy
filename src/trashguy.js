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
const FrameEngine = require('./_frameEngine')

class TrashGuy {
    static Symbols = {
        DEFAULT_INPUT: ['\u{0001F353}', '\u{0001F34A}', '\u{0001F345}'],
        SPACER_DEFAULT: '\u0020',
        SPACER_WIDE: '\u2800\u0020',
        SPACER_EMOJI: '\u2796',
        WRAPPER_MONOSPACE: '`',
        WRAPPER_BLOCK_MONO: '```',
        SPRITE_CAN: '\u{0001F5D1}',
        SPRITE_LEFT: '<(^_^ <)',
        SPRITE_RIGHT: '(> ^_^)>',
    }

    static DEFAULT_OPTIONS = {
        spriteCan: TrashGuy.Symbols.SPRITE_CAN,
        spriteLeft: TrashGuy.Symbols.SPRITE_LEFT,
        spriteRight: TrashGuy.Symbols.SPRITE_RIGHT,
        spacer: TrashGuy.Symbols.SPACER_DEFAULT,
        wrapper: '',
        frameStart: 0,
        framesMax: null
    }

    /**
     *
     * @param trashItems {Array | string}
     * @param options
     */
    constructor(trashItems, options = {
        spriteCan: TrashGuy.Symbols.SPRITE_CAN,
        spriteLeft: TrashGuy.Symbols.SPRITE_LEFT,
        spriteRight: TrashGuy.Symbols.SPRITE_RIGHT,
        spacer: TrashGuy.Symbols.SPACER_DEFAULT,
        wrapper: '',
        frameStart: 0,
        framesMax: null
    }) {
        const args = { ...TrashGuy.DEFAULT_OPTIONS, ...options }
        let sanTrashItems
        if (!trashItems) {
            throw new Error('no trash items given')
        } else if (typeof trashItems === 'string') {
            sanTrashItems = trashItems.split(" ")
        } else if (trashItems.some(item => !item)) {
            throw new Error('invalid input' + trashItems.filter(function (item) {
                return !item
            })
            )
        } else if (Array.isArray(trashItems)) {
            sanTrashItems = trashItems.filter(function (item) {
                return item !== " "
            })
        } else {
            throw new Error("Invalid input")
        }
        this.sprites = {
            trashItems: sanTrashItems,
            spriteTrash: args.spriteCan,
            spriteLeft: args.spriteLeft,
            spriteRight: args.spriteRight,
            spacer: args.spacer,
            wrapper: args.wrapper
        }

        this.frameStart = args.frameStart

        this.index = args.frameStart - 1
        this.defaultIndex = this.index
        const maxTotalFrames = this.length
        const maxAvailableFrames = maxTotalFrames - this.frameStart
        if (args.frameStart < 0) {
            throw new Error(`frame_start value is too low, expected \
            greater or equal to 0, but was given \
            ${args.frameStart} instead`)
        } else if (args.frameStart >= maxTotalFrames) {
            throw new Error(`frame_start value is too high, expected \
            less or equal to ${maxTotalFrames - 1}, but was given \
            ${args.frameStart} instead`)
        }

        if (!args.framesMax) {
            args.framesMax = maxAvailableFrames
        } else if (args.framesMax > maxAvailableFrames) {
            throw new Error(`frames_max value is too high, expected \
            less or equal to ${maxAvailableFrames}, but was given \
            ${args.framesMax} instead`)
        }

        this.slices = { frameStart: args.frameStart, framesMax: args.framesMax }
    }

    * [Symbol.iterator]() {
        while (true) {
            const item = this.getNext()
            if (!item) {
                this.index = this.defaultIndex
                break
            }
            yield item
        }
    }

    animate() {
        const ar = []
        while (true) {
            const item = this.getNext()
            if (!item) {
                break
            }
            ar.push(item)
        }
        return ar.join('\n')
    }

    getItem(i) {
        if (Array.isArray(i)) {
            throw new Error("ok")
        } else if (typeof i === 'number') {
            if (i < 0) {
                i += this.length
            }
            if (i < 0 || i >= this.length) {
                throw new Error('TrahsGuy index out of range <(v_v)> ')
            }
            return FrameEngine.getFrame(this.slices, this.sprites, i)
        } else {
            throw new Error(`trashguy indices must be integers or slices, \
                            not ${typeof i}`)
        }
    }

    getNext() {

        this.index++
        try {
            return FrameEngine.getFrame(this.slices, this.sprites, this.index)
        } catch (e) {
            return false
        }
    }


    get length() {
        const fgv = FrameEngine.frameGroupValues(this.sprites)
        return fgv.totalFrameCount
    }

}

module.exports = { TrashGuy }
