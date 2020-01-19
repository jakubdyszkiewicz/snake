import org.w3c.dom.*
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.window


val field = Field(width = 20, height = 20)

fun main() {
    GameView().draw(emptyGame(field))

    window.addEventListener("keydown", {e ->
        val event = e as KeyboardEvent
        if (event.keyCode == 32) {
            startNewGame()
        }
    })
}

fun startNewGame() {
    val view = GameView()
    val game = Game(field)

    val callback: (Event) -> Unit = { e ->
        val event = e as KeyboardEvent
        when (event.keyCode) {
            37 -> game.snake.left()
            38 -> game.snake.up()
            39 -> game.snake.right()
            40 -> game.snake.down()
        }
    }
    window.addEventListener("keydown", callback)

    var intervalId = 0
    val tick = {
        if (!game.over) {
            game.tick()
            val highScore = HighScore.get() ?: -1
            if (game.score > highScore) {
                HighScore.set(game.score)
            }
            view.draw(game)
        } else {
            view.draw(game)
            window.removeEventListener("keydown", callback)
            window.clearInterval(intervalId)
        }
    }
    intervalId = window.setInterval(tick, 100)
}

class GameView {
    companion object {
        const val box = 32.0
    }

    private val canvas = document.getElementById("game") as HTMLCanvasElement
    private val context = canvas.getContext("2d") as CanvasRenderingContext2D
    private val scoreSpan = document.getElementById("score") as HTMLSpanElement
    private val highScoreSpan = document.getElementById("high-score") as HTMLSpanElement
    private val hint =  document.getElementById("hint") as HTMLHeadingElement

    fun draw(game: Game) {
        drawField(game.field)
        drawSnake(game.snake, game.over)
        drawFruit(game.fruit)
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
        fields1.forEach { pos -> context.fillRect(pos.x * box, pos.y * box, box, box) }

        context.fillStyle = "#70B3FF"
        fields2.forEach { pos -> context.fillRect(pos.x * box, pos.y * box, box, box) }
    }

    private fun drawSnake(snake: Snake, gameOver: Boolean) {
        context.fillStyle = if (gameOver) "grey" else "green"
        snake.getPositions().forEach { pos ->
            context.fillRect(pos.x * box, pos.y * box, box, box)
        }
    }

    private fun drawFruit(fruit: Position?) {
        fruit?.let {
            context.fillStyle = "red"
            context.fillRect(it.x * box, it.y * box, box, box)
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
}

object HighScore {
    private const val key = "highScore"
    fun get(): Int? = window.localStorage[key]?.toIntOrNull()
    fun set(score: Int) {
        window.localStorage[key] = score.toString()
    }
}