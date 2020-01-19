if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'snake'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'snake'.");
}
var snake = function (_, Kotlin) {
  'use strict';
  var Enum = Kotlin.kotlin.Enum;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwISE = Kotlin.throwISE;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var toSet = Kotlin.kotlin.collections.toSet_7wnvza$;
  var shuffled = Kotlin.kotlin.collections.shuffled_7wnvza$;
  var minus = Kotlin.kotlin.collections.minus_q4559j$;
  var firstOrNull = Kotlin.kotlin.collections.firstOrNull_2p1efm$;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var addAll = Kotlin.kotlin.collections.addAll_ipc267$;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var Collection = Kotlin.kotlin.collections.Collection;
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var toIntOrNull = Kotlin.kotlin.text.toIntOrNull_pdl1vz$;
  var Pair_init = Kotlin.kotlin.Pair;
  Direction.prototype = Object.create(Enum.prototype);
  Direction.prototype.constructor = Direction;
  function Direction(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Direction_initFields() {
    Direction_initFields = function () {
    };
    Direction$UP_instance = new Direction('UP', 0);
    Direction$DOWN_instance = new Direction('DOWN', 1);
    Direction$LEFT_instance = new Direction('LEFT', 2);
    Direction$RIGHT_instance = new Direction('RIGHT', 3);
  }
  var Direction$UP_instance;
  function Direction$UP_getInstance() {
    Direction_initFields();
    return Direction$UP_instance;
  }
  var Direction$DOWN_instance;
  function Direction$DOWN_getInstance() {
    Direction_initFields();
    return Direction$DOWN_instance;
  }
  var Direction$LEFT_instance;
  function Direction$LEFT_getInstance() {
    Direction_initFields();
    return Direction$LEFT_instance;
  }
  var Direction$RIGHT_instance;
  function Direction$RIGHT_getInstance() {
    Direction_initFields();
    return Direction$RIGHT_instance;
  }
  Direction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Direction',
    interfaces: [Enum]
  };
  function Direction$values() {
    return [Direction$UP_getInstance(), Direction$DOWN_getInstance(), Direction$LEFT_getInstance(), Direction$RIGHT_getInstance()];
  }
  Direction.values = Direction$values;
  function Direction$valueOf(name) {
    switch (name) {
      case 'UP':
        return Direction$UP_getInstance();
      case 'DOWN':
        return Direction$DOWN_getInstance();
      case 'LEFT':
        return Direction$LEFT_getInstance();
      case 'RIGHT':
        return Direction$RIGHT_getInstance();
      default:throwISE('No enum constant Direction.' + name);
    }
  }
  Direction.valueOf_61zpoe$ = Direction$valueOf;
  function Position(x, y) {
    this.x = x;
    this.y = y;
  }
  Position.prototype.nextIn_h80bq7$ = function (direction) {
    switch (direction.name) {
      case 'LEFT':
        return new Position(this.x - 1 | 0, this.y);
      case 'RIGHT':
        return new Position(this.x + 1 | 0, this.y);
      case 'UP':
        return new Position(this.x, this.y - 1 | 0);
      case 'DOWN':
        return new Position(this.x, this.y + 1 | 0);
      default:return Kotlin.noWhenBranchMatched();
    }
  };
  Position.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Position',
    interfaces: []
  };
  Position.prototype.component1 = function () {
    return this.x;
  };
  Position.prototype.component2 = function () {
    return this.y;
  };
  Position.prototype.copy_vux9f0$ = function (x, y) {
    return new Position(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Position.prototype.toString = function () {
    return 'Position(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Position.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Position.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function Snake(positions, direction) {
    if (positions === void 0) {
      positions = ArrayList_init();
    }
    this.positions_0 = positions;
    this.direction_0 = direction;
    this.lastPosition_0 = null;
    this.directionChange_0 = null;
  }
  Snake.prototype.getPositions = function () {
    return this.positions_0;
  };
  Snake.prototype.move = function () {
    var tmp$;
    if ((tmp$ = this.directionChange_0) != null) {
      this.direction_0 = tmp$;
    }
    var newPos = last(this.positions_0).nextIn_h80bq7$(this.direction_0);
    this.positions_0.add_11rb$(newPos);
    var oldPos = this.positions_0.removeAt_za3lpa$(0);
    this.lastPosition_0 = oldPos;
    return oldPos;
  };
  Snake.prototype.moveBack = function () {
    var tmp$;
    this.positions_0.removeAt_za3lpa$(this.positions_0.size - 1 | 0);
    if ((tmp$ = this.lastPosition_0) != null) {
      this.positions_0.add_wxm5ur$(0, tmp$);
    }
  };
  Snake.prototype.grow = function () {
    var tmp$;
    if ((tmp$ = this.lastPosition_0) != null) {
      this.positions_0.add_wxm5ur$(0, tmp$);
    }
  };
  Snake.prototype.left = function () {
    if (this.direction_0 !== Direction$RIGHT_getInstance()) {
      this.directionChange_0 = Direction$LEFT_getInstance();
    }
  };
  Snake.prototype.up = function () {
    if (this.direction_0 !== Direction$DOWN_getInstance()) {
      this.directionChange_0 = Direction$UP_getInstance();
    }
  };
  Snake.prototype.right = function () {
    if (this.direction_0 !== Direction$LEFT_getInstance()) {
      this.directionChange_0 = Direction$RIGHT_getInstance();
    }
  };
  Snake.prototype.down = function () {
    if (this.direction_0 !== Direction$UP_getInstance()) {
      this.directionChange_0 = Direction$DOWN_getInstance();
    }
  };
  Snake.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Snake',
    interfaces: []
  };
  function Field(width, height) {
    this.width = width;
    this.height = height;
    var $receiver = new IntRange(1, this.width);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var $receiver_0 = new IntRange(1, this.height);
      var destination_0 = ArrayList_init_0(collectionSizeOrDefault($receiver_0, 10));
      var tmp$_0;
      tmp$_0 = $receiver_0.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        destination_0.add_11rb$(new Position(element, item));
      }
      var list = destination_0;
      addAll(destination, list);
    }
    this.positions = destination;
  }
  Field.prototype.center = function () {
    return new Position(this.width / 2 | 0, this.height / 2 | 0);
  };
  Field.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Field',
    interfaces: []
  };
  Field.prototype.component1 = function () {
    return this.width;
  };
  Field.prototype.component2 = function () {
    return this.height;
  };
  Field.prototype.copy_vux9f0$ = function (width, height) {
    return new Field(width === void 0 ? this.width : width, height === void 0 ? this.height : height);
  };
  Field.prototype.toString = function () {
    return 'Field(width=' + Kotlin.toString(this.width) + (', height=' + Kotlin.toString(this.height)) + ')';
  };
  Field.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    return result;
  };
  Field.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height)))));
  };
  function emptyGame(field) {
    return new Game(field, new Snake(void 0, Direction$UP_getInstance()));
  }
  function Game(field, snake) {
    if (snake === void 0)
      snake = new Snake(mutableListOf([field.center(), field.center().nextIn_h80bq7$(Direction$UP_getInstance())]), Direction$UP_getInstance());
    this.field = field;
    this.snake = snake;
    this.fruit = null;
    this.over_pr8q2y$_0 = false;
    this.score_iq6o1w$_0 = 0;
  }
  Object.defineProperty(Game.prototype, 'over', {
    get: function () {
      return this.over_pr8q2y$_0;
    },
    set: function (over) {
      this.over_pr8q2y$_0 = over;
    }
  });
  Object.defineProperty(Game.prototype, 'score', {
    get: function () {
      return this.score_iq6o1w$_0;
    },
    set: function (score) {
      this.score_iq6o1w$_0 = score;
    }
  });
  Game.prototype.tick = function () {
    this.snake.move();
    if (this.isSnakeColliding_0()) {
      this.snake.moveBack();
      this.over = true;
      return;
    }
    if (this.isSnakeEatingFruit_0()) {
      this.snake.grow();
      this.fruit = null;
      this.score = this.score + 1 | 0;
    }
    if (this.fruit == null) {
      this.fruit = this.nonOccupiedPosition_0();
    }
  };
  Game.prototype.isSnakeEatingFruit_0 = function () {
    var tmp$, tmp$_0;
    return (tmp$_0 = (tmp$ = this.fruit) != null ? this.snake.getPositions().contains_11rb$(tmp$) : null) != null ? tmp$_0 : false;
  };
  Game.prototype.isSnakeColliding_0 = function () {
    var $receiver = this.snake.getPositions();
    var any$result;
    any$break: do {
      var tmp$;
      if (Kotlin.isType($receiver, Collection) && $receiver.isEmpty()) {
        any$result = false;
        break any$break;
      }
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (element.x === 0 || element.x > this.field.width || element.y === 0 || element.y > this.field.height) {
          any$result = true;
          break any$break;
        }
      }
      any$result = false;
    }
     while (false);
    var fieldCollision = any$result;
    var snakeCollision = toSet(this.snake.getPositions()).size !== this.snake.getPositions().size;
    return fieldCollision || snakeCollision;
  };
  Game.prototype.nonOccupiedPosition_0 = function () {
    return firstOrNull(minus(shuffled(this.field.positions), this.snake.getPositions()));
  };
  Game.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Game',
    interfaces: []
  };
  var field;
  function main$lambda(closure$currentGame) {
    return function (e) {
      var tmp$, tmp$_0;
      var event = Kotlin.isType(tmp$ = e, KeyboardEvent) ? tmp$ : throwCCE();
      if (event.keyCode === 32) {
        if (((tmp$_0 = closure$currentGame.v) != null ? tmp$_0.over : null) !== false) {
          closure$currentGame.v = startNewGame();
        }
      }
      return Unit;
    };
  }
  function main() {
    GameView_getInstance().draw_1beoi$(emptyGame(field));
    var currentGame = {v: null};
    window.addEventListener('keydown', main$lambda(currentGame));
  }
  function startNewGame$lambda(closure$game) {
    return function (e) {
      var tmp$;
      var event = Kotlin.isType(tmp$ = e, KeyboardEvent) ? tmp$ : throwCCE();
      switch (event.keyCode) {
        case 37:
          closure$game.snake.left();
          break;
        case 38:
          closure$game.snake.up();
          break;
        case 39:
          closure$game.snake.right();
          break;
        case 40:
          closure$game.snake.down();
          break;
      }
      return Unit;
    };
  }
  function startNewGame$lambda_0(closure$game, closure$movementCallback, closure$intervalId) {
    return function () {
      var tmp$;
      if (!closure$game.over) {
        closure$game.tick();
        var highScore = (tmp$ = HighScore_getInstance().get()) != null ? tmp$ : -1;
        if (closure$game.score > highScore) {
          HighScore_getInstance().set_za3lpa$(closure$game.score);
        }
        GameView_getInstance().draw_1beoi$(closure$game);
      }
       else {
        GameView_getInstance().draw_1beoi$(closure$game);
        window.removeEventListener('keydown', closure$movementCallback);
        window.clearInterval(closure$intervalId.v);
      }
      return Unit;
    };
  }
  function startNewGame() {
    var game = new Game(field);
    var movementCallback = startNewGame$lambda(game);
    window.addEventListener('keydown', movementCallback);
    var intervalId = {v: 0};
    var tick = startNewGame$lambda_0(game, movementCallback, intervalId);
    intervalId.v = window.setInterval(tick, 100);
    return game;
  }
  function GameView() {
    GameView_instance = this;
    this.box = 32.0;
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    this.canvas_0 = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    this.context_0 = Kotlin.isType(tmp$_0 = this.canvas_0.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    this.scoreSpan_0 = Kotlin.isType(tmp$_1 = document.getElementById('score'), HTMLSpanElement) ? tmp$_1 : throwCCE();
    this.highScoreSpan_0 = Kotlin.isType(tmp$_2 = document.getElementById('high-score'), HTMLSpanElement) ? tmp$_2 : throwCCE();
    this.hint_0 = Kotlin.isType(tmp$_3 = document.getElementById('hint'), HTMLHeadingElement) ? tmp$_3 : throwCCE();
  }
  GameView.prototype.draw_1beoi$ = function (game) {
    var tmp$;
    this.drawField_0(game.field);
    this.drawSnake_0(game.snake, game.over);
    this.drawFruit_0(game.fruit);
    this.drawScore_0(game.score);
    this.drawHighScore_0((tmp$ = HighScore_getInstance().get()) != null ? tmp$ : 0);
    this.drawHint_0(game);
  };
  GameView.prototype.drawField_0 = function (field) {
    this.context_0.fillStyle = '#005FFF';
    this.context_0.fillRect(0.0, 0.0, this.box * (field.width + 2 | 0), this.box * (field.height + 2 | 0));
    var $receiver = field.positions;
    var tmp$;
    var first = ArrayList_init();
    var second = ArrayList_init();
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (element.x % 2 === 0 && element.y % 2 === 0 || (element.x % 2 === 1 && element.y % 2 === 1)) {
        first.add_11rb$(element);
      }
       else {
        second.add_11rb$(element);
      }
    }
    var tmp$_0 = new Pair_init(first, second);
    var fields1 = tmp$_0.component1()
    , fields2 = tmp$_0.component2();
    this.context_0.fillStyle = '#84C3FF';
    var tmp$_1;
    tmp$_1 = fields1.iterator();
    while (tmp$_1.hasNext()) {
      var element_0 = tmp$_1.next();
      this.context_0.fillRect(element_0.x * this.box, element_0.y * this.box, this.box, this.box);
    }
    this.context_0.fillStyle = '#70B3FF';
    var tmp$_2;
    tmp$_2 = fields2.iterator();
    while (tmp$_2.hasNext()) {
      var element_1 = tmp$_2.next();
      this.context_0.fillRect(element_1.x * this.box, element_1.y * this.box, this.box, this.box);
    }
  };
  GameView.prototype.drawSnake_0 = function (snake, gameOver) {
    this.context_0.fillStyle = gameOver ? 'grey' : 'green';
    var tmp$;
    tmp$ = snake.getPositions().iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      this.context_0.fillRect(element.x * this.box, element.y * this.box, this.box, this.box);
    }
  };
  GameView.prototype.drawFruit_0 = function (fruit) {
    if (fruit != null) {
      this.context_0.fillStyle = 'red';
      this.context_0.fillRect(fruit.x * this.box, fruit.y * this.box, this.box, this.box);
    }
  };
  GameView.prototype.drawScore_0 = function (score) {
    this.scoreSpan_0.innerText = score.toString();
  };
  GameView.prototype.drawHighScore_0 = function (score) {
    this.highScoreSpan_0.innerText = score.toString();
  };
  GameView.prototype.drawHint_0 = function (game) {
    this.hint_0.innerText = game.over ? 'Game over. Click spacebar to play again!' : 'To play click spacebar!';
  };
  GameView.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'GameView',
    interfaces: []
  };
  var GameView_instance = null;
  function GameView_getInstance() {
    if (GameView_instance === null) {
      new GameView();
    }
    return GameView_instance;
  }
  function HighScore() {
    HighScore_instance = this;
    this.key_0 = 'highScore';
  }
  HighScore.prototype.get = function () {
    var tmp$;
    return (tmp$ = window.localStorage[this.key_0]) != null ? toIntOrNull(tmp$) : null;
  };
  HighScore.prototype.set_za3lpa$ = function (score) {
    window.localStorage[this.key_0] = score.toString();
  };
  HighScore.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'HighScore',
    interfaces: []
  };
  var HighScore_instance = null;
  function HighScore_getInstance() {
    if (HighScore_instance === null) {
      new HighScore();
    }
    return HighScore_instance;
  }
  Object.defineProperty(Direction, 'UP', {
    get: Direction$UP_getInstance
  });
  Object.defineProperty(Direction, 'DOWN', {
    get: Direction$DOWN_getInstance
  });
  Object.defineProperty(Direction, 'LEFT', {
    get: Direction$LEFT_getInstance
  });
  Object.defineProperty(Direction, 'RIGHT', {
    get: Direction$RIGHT_getInstance
  });
  _.Direction = Direction;
  _.Position = Position;
  _.Snake = Snake;
  _.Field = Field;
  _.emptyGame_14espm$ = emptyGame;
  _.Game = Game;
  Object.defineProperty(_, 'field', {
    get: function () {
      return field;
    }
  });
  _.main = main;
  _.startNewGame = startNewGame;
  Object.defineProperty(_, 'GameView', {
    get: GameView_getInstance
  });
  Object.defineProperty(_, 'HighScore', {
    get: HighScore_getInstance
  });
  field = new Field(20, 20);
  main();
  Kotlin.defineModule('snake', _);
  return _;
}(typeof snake === 'undefined' ? {} : snake, kotlin);
