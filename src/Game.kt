enum class Direction {
    UP, DOWN, LEFT, RIGHT
}

data class Position(val x: Int, val y: Int) {
    fun inDirection(direction: Direction): Position = when (direction) {
        Direction.LEFT -> Position(x - 1, y)
        Direction.RIGHT -> Position(x + 1, y)
        Direction.UP -> Position(x, y - 1)
        Direction.DOWN -> Position(x, y + 1)
    }
}

class Snake(
        private val positions: MutableList<Position> = mutableListOf(),
        private var direction: Direction
) {
    // save the position from which the snake came from to be ab
    private var lastPosition: Position? = null
    // we cannot override direction itself because between move() you could go backwards
    // ex. snake goes left, we quickly up(), right(), move() and snake goes right which is not permitted
    private var directionChange: Direction? = null

    fun getPositions(): List<Position> = positions

    fun move(): Position {
        directionChange?.let { dir ->
            direction = dir
        }

        val newPos = positions.last().inDirection(direction)
        positions.add(newPos)
        val oldPos = positions.removeAt(0)
        lastPosition = oldPos
        return oldPos
    }

    fun moveBack() {
        positions.removeAt(positions.size - 1)
        lastPosition?.let { pos ->
            positions.add(0, pos)
        }
    }

    fun grow() {
        lastPosition?.let { pos ->
            positions.add(0, pos)
        }
    }

    fun left() {
        if (direction != Direction.RIGHT) {
            directionChange = Direction.LEFT
        }
    }

    fun up() {
        if (direction != Direction.DOWN) {
            directionChange = Direction.UP
        }
    }

    fun right() {
        if (direction != Direction.LEFT) {
            directionChange = Direction.RIGHT
        }
    }

    fun down() {
        if (direction != Direction.UP) {
            directionChange = Direction.DOWN
        }
    }
}

data class Field(val width: Int, val height: Int) {
    val positions: Collection<Position> = (1..width).flatMap { x ->
        (1..height).map { y ->
            Position(x, y)
        }
    }

    fun center() = Position(x = width / 2, y = height / 2)
}

fun emptyGame(field: Field) = Game(field, Snake(direction = Direction.UP))

class Game(
        val field: Field,
        val snake: Snake = Snake(
                positions = mutableListOf(field.center(), field.center().inDirection(Direction.UP)),
                direction = Direction.UP
        )
) {
    var fruit: Position? = null
    var over = false
        private set
    var score = 0
        private set

    fun tick() {
        snake.move()
        if (isSnakeColliding()) {
            snake.moveBack()
            over = true
            return
        }
        if (isSnakeEatingFruit()) {
            snake.grow()
            fruit = null
            score++
        }
        if (fruit == null) {
            fruit = nonOccupiedPosition()
        }
    }

    private fun isSnakeEatingFruit(): Boolean = fruit?.let { snake.getPositions().contains(it) } ?: false

    private fun isSnakeColliding(): Boolean {
        val fieldCollision = snake.getPositions().any { pos -> pos.x == 0 || pos.x > field.width || pos.y == 0 || pos.y > field.height }
        val snakeCollision = snake.getPositions().toSet().size != snake.getPositions().size
        return fieldCollision || snakeCollision
    }

    private fun nonOccupiedPosition(): Position? = (field.positions.shuffled() - snake.getPositions()).firstOrNull()
}