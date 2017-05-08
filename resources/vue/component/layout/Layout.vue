<template>
    <div class="u-relative">
        <header class="u-box u-box--justify-center">
            <span class="u-box u-box--align-center">
                Player 1 <tile :type="player1"></tile>
            </span>
            <span class="u-box u-box--align-center">
                <tile :type="player2"></tile> Player 2
            </span>
        </header>
        <main 
            class="layout u-box u-box--align-center">
            <div class="wrap-board u-relative u-box--inline">
                <div class="strikethrough u-absolute-full u-box u-box--justify-center u-box--align-center u-events--none">
                    <div 
                        v-if="winner && !checkDraw"
                        class="strikethrough-line"
                        :class="{ 
                            '--row1': strikethroughRow1, 
                            '--row2': strikethroughRow2, 
                            '--row3': strikethroughRow3,
                            '--col1': strikethroughCol1, 
                            '--col2': strikethroughCol2, 
                            '--col3': strikethroughCol3,
                            '--diagR1C1_R3C3': strikethroughR1C1_R3C3,
                            '--diagR3C1_R1C3': strikethroughR3C1_R1C3
                                }"></div>
                </div>
                <section class="board u-box--inline u-box--column">
                    <div class="row-tile u-box">
                        <tile 
                            class="pointer"
                            @click.native="onFlipTile('r1c1')"
                            :type="r1c1"></tile>
                        <tile 
                            class="pointer"
                            @click.native="onFlipTile('r1c2')"
                            :type="r1c2"></tile>
                        <tile 
                            class="pointer"
                            @click.native="onFlipTile('r1c3')"
                            :type="r1c3"></tile>
                    </div>
                    <div class="row-tile u-box">
                        <tile 
                            class="pointer"
                            @click.native="onFlipTile('r2c1')"
                            :type="r2c1"></tile>
                        <tile 
                            class="pointer"
                            @click.native="onFlipTile('r2c2')"
                            :type="r2c2"></tile>
                        <tile 
                            class="pointer"
                            @click.native="onFlipTile('r2c3')"
                            :type="r2c3"></tile>
                    </div>
                    <div class="row-tile u-box">
                        <tile 
                            class="pointer"
                            @click.native="onFlipTile('r3c1')"
                            :type="r3c1"></tile>
                        <tile 
                            class="pointer"
                            @click.native="onFlipTile('r3c2')"
                            :type="r3c2"></tile>
                        <tile 
                            class="pointer"
                            @click.native="onFlipTile('r3c3')"
                            :type="r3c3"></tile>
                    </div>
                </section>
            </div>
            
        </main>
        <footer class="u-box u-box--justify-center">

            <div class="col">
                Current Turn: <tile :type="turn"></tile>
                
            </div>
            <div class="col">
                Winner: <tile :type="winner"></tile>
                <span>{{winner}}</span>

                <div v-if="winner == player1">Player 1 wins</div>
                <div v-else-if="winner == player2">Player 2 wins</div>
                <div v-if="checkDraw">DRAW</div>
            </div>

            <div 
                class="col" 
                v-if="askReset" 
                @click="reset">
                Reset Game ?
            </div>

        </footer>
    </div>
</template>

<script>
    import './Layout.scss'

    export default {
        name: 'Layout',
        data: () => ({
            turn: 'cross',
            player1: null,
            winner: null,
            askReset: false
        }),
        computed: {
            player2 () {
                if (this.player1 === 'cross') return 'circle'
                if (this.player1 === 'circle') return 'cross'
                return null
            },

            // row 1
            r1c1: {
                get () {
                    return this.$store.state.r1c1
                },
                set (value) {
                    this.$store.dispatch("SET_R1C1", value)
                }
            },
            r1c2: {
                get () {
                    return this.$store.state.r1c2
                },
                set (value) {
                    this.$store.dispatch("SET_R1C2", value)
                }
            },
            r1c3: {
                get () {
                    return this.$store.state.r1c3
                },
                set (value) {
                    this.$store.dispatch("SET_R1C3", value)
                }
            },

            // row 2
            r2c1: {
                get () {
                    return this.$store.state.r2c1
                },
                set (value) {
                    this.$store.dispatch("SET_R2C1", value)
                }
            },
            r2c2: {
                get () {
                    return this.$store.state.r2c2
                },
                set (value) {
                    this.$store.dispatch("SET_R2C2", value)
                }
            },
            r2c3: {
                get () {
                    return this.$store.state.r2c3
                },
                set (value) {
                    this.$store.dispatch("SET_R2C3", value)
                }
            },

            // row 3
            r3c1: {
                get () {
                    return this.$store.state.r3c1
                },
                set (value) {
                    this.$store.dispatch("SET_R3C1", value)
                }
            },
            r3c2: {
                get () {
                    return this.$store.state.r3c2
                },
                set (value) {
                    this.$store.dispatch("SET_R3C2", value)
                }
            },
            r3c3: {
                get () {
                    return this.$store.state.r3c3
                },
                set (value) {
                    this.$store.dispatch("SET_R3C3", value)
                }
            },

            // strikethrough Row
            strikethroughRow1 () {
                let row1x = this.sameLine(this.r1c1, this.r1c2, this.r1c3, 'cross')
                let row1o = this.sameLine(this.r1c1, this.r1c2, this.r1c3, 'circle')
                return Boolean(row1x || row1o)
            },
            strikethroughRow2 () {
                let row2x = this.sameLine(this.r2c1, this.r2c2, this.r2c3, 'cross')
                let row2o = this.sameLine(this.r2c1, this.r2c2, this.r2c3, 'circle')
                return Boolean(row2x || row2o)
            },
            strikethroughRow3 () {
                let row3x = this.sameLine(this.r3c1, this.r3c2, this.r3c3, 'cross')
                let row3o = this.sameLine(this.r3c1, this.r3c2, this.r3c3, 'circle')
                return Boolean(row3x || row3o)
            },

            // strikethrough Col
            strikethroughCol1 () {
                let col1x = this.sameLine(this.r1c1, this.r2c1, this.r3c1, 'cross')
                let col1o = this.sameLine(this.r1c1, this.r2c1, this.r3c1, 'circle')
                return Boolean(col1x || col1o)
            },
            strikethroughCol2 () {
                let col2x = this.sameLine(this.r1c2, this.r2c2, this.r3c2, 'cross')
                let col2o = this.sameLine(this.r1c2, this.r2c2, this.r3c2, 'circle')
                return Boolean(col2x || col2o)
            },
            strikethroughCol3 () {
                let col3x = this.sameLine(this.r1c3, this.r2c3, this.r3c3, 'cross')
                let col3o = this.sameLine(this.r1c3, this.r2c3, this.r3c3, 'circle')
                return Boolean(col3x || col3o)
            },

            
            // strikethrough Diagonal
            strikethroughR1C1_R3C3 () {
                let diagX = this.sameLine(this.r1c1, this.r2c2, this.r3c3, 'cross')
                let diagO = this.sameLine(this.r1c1, this.r2c2, this.r3c3, 'circle')
                return Boolean(diagX || diagO)
            },
            strikethroughR3C1_R1C3 () {
                let diagX = this.sameLine(this.r3c1, this.r2c2, this.r1c3, 'cross')
                let diagO = this.sameLine(this.r3c1, this.r2c2, this.r1c3, 'circle')
                return Boolean(diagX || diagO)
            },

            checkDraw () {
                return this.winner == 'draw'
            }

        },
        methods: {
            nextTurn () {
                this.turn = this.turn === "cross" ? "circle" : "cross";
            },
            sameLine (o1, o2, o3, value) {
                return Boolean(true * (o1 === value) * (o2 === value) * (o3 === value))
            },
            whoWins (player) {
                let win = false
                let row1 = this.sameLine(this.r1c1, this.r1c2, this.r1c3, player)
                let row2 = this.sameLine(this.r2c1, this.r2c2, this.r2c3, player)
                let row3 = this.sameLine(this.r3c1, this.r3c2, this.r3c3, player)
                let col1 = this.sameLine(this.r1c1, this.r2c1, this.r3c1, player)
                let col2 = this.sameLine(this.r1c2, this.r2c2, this.r3c2, player)
                let col3 = this.sameLine(this.r1c3, this.r2c3, this.r3c3, player)
                let lineR1C1_R3C3 = this.sameLine(this.r1c1, this.r2c2, this.r3c3, player)
                let lineR3C1_R1C3 = this.sameLine(this.r3c1, this.r2c2, this.r1c3, player)
                return Boolean(win + row1 + row2 + row3 + col1 + col2 + col3 + lineR1C1_R3C3 + lineR3C1_R1C3)
            },
            hasEnded () {
                return !!((
                    this.r1c1 !== null && 
                    this.r1c2 !== null && 
                    this.r1c3 !== null && 
                    this.r2c1 !== null && 
                    this.r2c2 !== null && 
                    this.r2c3 !== null && 
                    this.r3c1 !== null && 
                    this.r3c2 !== null && 
                    this.r3c3 !== null))
            },
            checkWinner () {
                if (this.whoWins('cross')) {
                    this.winner = 'cross'
                } else if (this.whoWins('circle')) {
                    this.winner = 'circle'
                } else if (this.hasEnded()) {
                    this.winner = 'draw'
                } else {
                    this.winner = null
                }
            },
            getRandomIntInclusive(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            reset () {
                this.setAllValueToNull()
                this.randomizeTypePlayer1()
                this.askReset = false
                this.winner = null
            },
            setAllValueToNull () {
                this.r1c1 = this.r1c2 = this.r1c3 = this.r2c1 = this.r2c2 = this.r2c3 = this.r3c1 = this.r3c2 = this.r3c3 = null
            },
            randomizeTypePlayer1 () {
                this.player1 = this.getRandomIntInclusive(0,1) === 0 ? 'circle' : 'cross';
            },

            // Events
            onFlipTile(tileObject) {

                if (!this.winner && this[tileObject] === null) {
                    this.$set(this, tileObject, this.turn)
                    this.checkWinner();
                    if(this.winner || this.hasEnded()) {
                        this.askReset = true;
                    } else {
                        this.nextTurn()
                    }
                    console.log('nextPlayer turn')
                } else {
                    console.log('same player turn')
                }

                console.log('hasEnded', this.hasEnded())
            }

        },
        // LifeCycle Hooks
        created() {
            this.reset()
        },
  
    }
</script>