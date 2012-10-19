// Generated by CoffeeScript 1.3.1
(function() {
  var ThreeDCellularAutomata,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.BACKGROUND_COLOR = 0x000000;

  this.WIDTH = 620;

  this.HEIGHT = 480;

  this.VIEW_ANGLE = 45;

  this.NEAR = 1;

  this.FAR = 10000;

  this.CAMERA_DISTANCE = 500;

  this.ASPECT = this.WIDTH / this.HEIGHT;

  this.WOLFRAM_NUMBER = 154;

  this.GRID_SIZE = 100;

  ThreeDCellularAutomata = (function() {

    ThreeDCellularAutomata.name = 'ThreeDCellularAutomata';

    function ThreeDCellularAutomata(container, wolframNumber, gridSize) {
      this._animate = __bind(this._animate, this);
      this.container = container;
      this.wolframNumber = wolframNumber;
      this.gridSize = gridSize;
      this._init();
      this._animate();
    }

    ThreeDCellularAutomata.prototype._init = function() {
      this._buildGrid();
      this._createScene();
      return this._buildAutomata();
    };

    ThreeDCellularAutomata.prototype._animate = function() {
      var timer;
      requestAnimationFrame(this._animate);
      timer = 0.0002 * Date.now();
      this.camera.position.x = Math.sin(timer) * 300 + WIDTH / 2;
      this.camera.position.z = Math.cos(timer) * CAMERA_DISTANCE;
      this.camera.position.y = Math.cos(timer) * 300 + HEIGHT / 2;
      this.camera.lookAt(new THREE.Vector3(400, 500, 0));
      return this.renderer.render(this.scene, this.camera);
    };

    ThreeDCellularAutomata.prototype._buildGrid = function() {
      var i, j, rule, _i, _j, _k, _l, _ref, _ref1, _ref2, _ref3, _results;
      rule = this._toBinaryArray(this.wolframNumber);
      this.grid = [];
      for (i = _i = 0, _ref = this.gridSize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.grid[i] = [];
      }
      for (i = _j = 0, _ref1 = this.gridSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        for (j = _k = 0, _ref2 = this.gridSize - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
          this.grid[i][j] = 0;
        }
      }
      this.grid[Math.round(this.gridSize * 0.5)][0] = 1;
      _results = [];
      for (j = _l = 1, _ref3 = this.gridSize - 2; 1 <= _ref3 ? _l <= _ref3 : _l >= _ref3; j = 1 <= _ref3 ? ++_l : --_l) {
        _results.push((function() {
          var _m, _ref4, _results1;
          _results1 = [];
          for (i = _m = 1, _ref4 = this.gridSize - 2; 1 <= _ref4 ? _m <= _ref4 : _m >= _ref4; i = 1 <= _ref4 ? ++_m : --_m) {
            _results1.push(this.grid[i][j] = this._calculateRule(rule, i, j));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    ThreeDCellularAutomata.prototype._calculateRule = function(rule, i, j) {
      var val;
      val = this.grid[i - 1][j - 1] * 4 + this.grid[i][j - 1] * 2 + this.grid[i + 1][j - 1];
      return rule[val];
    };

    ThreeDCellularAutomata.prototype._toBinaryArray = function(number) {
      var i, _i, _results;
      _results = [];
      for (i = _i = 0; _i <= 7; i = ++_i) {
        _results.push(number >> i & 0x01);
      }
      return _results;
    };

    ThreeDCellularAutomata.prototype._createScene = function() {
      var light1, light2, light3, light4;
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(WIDTH, HEIGHT);
      this.renderer.setClearColorHex(BACKGROUND_COLOR, 1.0);
      this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
      this.camera.position.x = WIDTH / 1.5;
      this.camera.position.y = HEIGHT / 1.5;
      this.camera.position.z = CAMERA_DISTANCE;
      this.camera.rotation.x = -Math.PI / 180 * 5;
      this.scene.add(this.camera);
      light1 = new THREE.DirectionalLight(0xffffff);
      light1.position.set(1, 1, 1).normalize();
      this.scene.add(light1);
      light2 = new THREE.DirectionalLight(0xffffff);
      light2.position.set(-1, -1, -1).normalize();
      this.scene.add(light2);
      light3 = new THREE.PointLight(0xffffff);
      light3.position.set(WIDTH / 2, HEIGHT / 2, 400);
      this.scene.add(light3);
      light4 = new THREE.PointLight(0xffffff);
      light4.position.set(WIDTH / 2, HEIGHT / 2, -400);
      this.scene.add(light4);
      return this.container.appendChild(this.renderer.domElement);
    };

    ThreeDCellularAutomata.prototype._buildAutomata = function() {
      var i, j, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.gridSize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (j = _j = 0, _ref1 = this.gridSize - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push(this._buildCube(i, j));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    ThreeDCellularAutomata.prototype._buildCube = function(i, j) {
      var cube, material;
      if (this.grid[i][j] !== 1) {
        return;
      }
      material = new THREE.MeshPhongMaterial({
        color: (j % 255 << 16) + (100 << 8) + 255,
        shininess: 100.0,
        specular: 0xffffff
      });
      cube = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10), material);
      cube.position.set(i * 10, j * 10, 0);
      return this.scene.add(cube);
    };

    return ThreeDCellularAutomata;

  })();

  this.start3DCA = function(container) {
    if (container == null) {
      container = document.createElement('div');
      document.body.appendChild(container);
    }
    return new ThreeDCellularAutomata(container, WOLFRAM_NUMBER, GRID_SIZE);
  };

}).call(this);