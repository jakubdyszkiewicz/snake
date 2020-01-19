import org.w3c.dom.*
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.window

const val GAME_SPEED = 100
val field = Field(width = 20, height = 20)

fun main() {
    GameView.draw(emptyGame(field))

    var currentGame: Game? = null
    window.addEventListener("keydown", {e ->
        val event = e as KeyboardEvent
        if (event.keyCode == 32) { // spacebar
            if (currentGame?.over != false) {
                currentGame = startNewGame()
            }
        }
    })
}

const val KEY_LEFT = 37
const val KEY_UP = 38
const val KEY_RIGHT = 39
const val KEY_DOWN = 40

fun startNewGame(): Game {
    val game = Game(field)

    val movementCallback: (Event) -> Unit = { e ->
        val event = e as KeyboardEvent
        when (event.keyCode) {
            KEY_LEFT -> game.snake.left()
            KEY_UP -> game.snake.up()
            KEY_RIGHT -> game.snake.right()
            KEY_DOWN -> game.snake.down()
        }
    }
    window.addEventListener("keydown", movementCallback)

    var intervalId = 0 // is there a better way to cancel interval?
    val tick = {
        if (!game.over) {
            game.tick()
            val highScore = HighScore.get() ?: -1
            if (game.score > highScore) {
                HighScore.set(game.score)
            }
            GameView.draw(game)
        } else {
            GameView.draw(game)
            window.removeEventListener("keydown", movementCallback)
            window.clearInterval(intervalId)
        }
    }
    intervalId = window.setInterval(tick, GAME_SPEED)
    return game
}

object GameView {
    const val box = 32.0

    private val canvas = document.getElementById("game") as HTMLCanvasElement
    private val context = canvas.getContext("2d") as CanvasRenderingContext2D
    private val scoreSpan = document.getElementById("score") as HTMLSpanElement
    private val highScoreSpan = document.getElementById("high-score") as HTMLSpanElement
    private val hint =  document.getElementById("hint") as HTMLHeadingElement

    fun draw(game: Game) {
        drawField(game.field)
        drawSnake(game.snake, game.over)
        drawFruit(game.fruit)
        drawTimedItem(game.timedItem)
        drawScore(game.score)
        drawHighScore(HighScore.get() ?: 0)
        drawHint(game)
    }

    private fun drawField(field: Field) {
        context.fillStyle = "#005FFF"
        context.fillRect(0.0, 0.0, box * (field.width + 2), box * (field.height + 2))

        // draw chessboard
        val (fields1, fields2) = field.positions.partition { (it.x % 2 == 0 && it.y % 2 == 0) || (it.x % 2 == 1 && it.y % 2 == 1) }

        context.fillStyle = "#84C3FF"
        fields1.forEach(::drawBox)

        context.fillStyle = "#70B3FF"
        fields2.forEach(::drawBox)
    }

    private fun drawSnake(snake: Snake, gameOver: Boolean) {
        context.fillStyle = if (gameOver) "grey" else "green"
        snake.getPositions().forEach(::drawBox)
    }

    private fun drawFruit(fruit: Position?) {
        context.fillStyle = "red"
        fruit?.let(::drawBox)
    }

    private fun drawTimedItem(timedItem: TimedItem?) {
        context.fillStyle = "yellow"
        timedItem?.let {
            drawBox(it.position)
            drawText(it.ticksRemaining().toString(), it.position)
        }
    }

    private fun drawScore(score: Int) {
        scoreSpan.innerText = score.toString()
    }

    private fun drawHighScore(score: Int) {
        highScoreSpan.innerText = score.toString()
    }

    private fun drawHint(game: Game) {
        hint.innerText = if (game.over) "Game over. Click spacebar to play again!" else "To play click spacebar!"
    }

    private fun drawText(text: String, pos: Position) {
        context.fillStyle = "black"
        context.font = "16px Arial"
        context.textAlign = CanvasTextAlign.CENTER
        context.textBaseline = CanvasTextBaseline.MIDDLE
        context.fillText(text, pos.x * box + box/2, pos.y * box + box/2, box)
    }

    private fun drawBox(pos: Position) {
        context.fillRect(pos.x * box, pos.y * box, box, box)
    }
}

object HighScore {
    private const val key = "highScore"
    fun get(): Int? = window.localStorage[key]?.toIntOrNull()
    fun set(score: Int) {
        window.localStorage[key] = score.toString()
    }
}