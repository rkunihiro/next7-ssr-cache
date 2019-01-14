import * as React from 'react';

export class IndexPage extends React.Component {
    static async getInitialProps() {
        const now = (new Date()).toISOString();
        return { now };
    }

    render() {
        return (
            <>
                <div>Hello,World!</div>
                <div>Now: {this.props.now}</div>
            </>
        );
    }
}

export default IndexPage;
