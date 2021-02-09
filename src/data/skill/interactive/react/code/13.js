
export const codeSplite_1 = `
import("./math").then(math => {
  console.log(math.add(16, 26));
});


// 之前:
import { add } from './math';

console.log(add(16, 26));
`

export const codeSplite_2 = `
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}


// 之前:
import OtherComponent from './OtherComponent';

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
`

export const codeSplite_3 = `
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
`

export const codeSplite_4 = `
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
`