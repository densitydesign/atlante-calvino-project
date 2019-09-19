###JSX

#### Conditionals
```
{ !baby && <li>Pizza</li> }
```

#### Comments
```
{ /*<li>Pizza</li>*/ }
```

### Props

#### Set default Props
```
ExampleComponent.defaultProps = { propName: 'propValue' };
```

### States

#### A component with a state
```
class App extends React.Component {
	// constructor method begins here:
	constructor(props){
    super(props);
    this.state = { title: 'Best App' }
  }

  render() {
    return (
      <h1>
        {this.state.title}
      </h1>
    );
  }
}
```

#### A component changing its state

```
class Mood extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mood: 'good' };
👉  this.toggleMood = this.toggleMood.bind(this);
  }

👉toggleMood() {
    const newMood = this.state.mood == 'good' ? 'bad' : 'good';
    this.setState({ mood: newMood });
  }

  render() {
    return (
      <div>
        <h1>I'm feeling {this.state.mood}!</h1>
👉      <button onClick={this.toggleMood}>
          Click Me
        </button>
      </div>
    );
  }
}
```
Keep in mind that when `this.setState({ mood: newMood }) ` is called, React re-render the component automatically.

#### Child components can modify parents States
The parent:
```
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Frarthur' };
👉  this.changeName = this.changeName.bind(this);
  }

👉changeName(newName) {
    this.setState({
      name: newName
    });
  }

  render() {
👉  return <Child name={this.state.name} onChange={this.changeName} />
  }
}
```

The child:

```
class Child extends React.Component {
  constructor(props) {
    super(props);
👉  this.handleChange = this.handleChange.bind(this);
  }

👉handleChange(e) {
    const name = e.target.value;
    this.props.onChange(name);
  }

  render() {
    return (
      <div>
        <h1>
          Hey my name is {this.props.name}!
        </h1>
👉      <select id="great-names" onChange={this.handleChange}>
          <option value="Frarthur">
            Frarthur
          </option>

          <option value="Gromulus">
            Gromulus
          </option>

          <option value="Thinkpiece">
            Thinkpiece
          </option>
        </select>
      </div>
    );
  }
}
```

### D3 charts

new component folder
inside make a js file viz-name.d3.js organised in this way:
```
import * as d3 from 'd3';

const Viz = {};

Viz.initialize = (el) => {}

Viz.update = (data) => {}

Viz.destroy = (el) => {}

export default Viz
```

How to structure the component:
```
class TimeFilter extends Component {

  componentDidMount() {
    this._chart = Viz.initialize(
        this._rootNode,
        this.props.data,
        this.props.config
    );
  }

  componentDidUpdate() {
    Viz.update(
       this._rootNode,
       this.props.data,
       this.props.config,
       this._chart
    );
  }

  componentWillUnmount() {
    Viz.destroy(this._rootNode);
  }

  _setRef(componentNode) {
      this._rootNode = componentNode;
  }


  render() {
    return <svg ref={this._setRef.bind(this)}></svg>
  }
}
```
