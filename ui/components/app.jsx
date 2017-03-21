import React from 'react';

const App = ({children}) =>
    <div>
        {children}
    </div>;

App.propTypes = {
    children: React.PropTypes.element,
};

export default App;
