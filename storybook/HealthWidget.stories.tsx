import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';
import { HealthWidget } from '../src/gui/components/widgets/health_widget/HealthWidget';

const Wrapper = () => {
    const [health, setHealth] = useState(75);

    return (
        <div style={{ background: 'black', height: '100px', padding: '5px'}}>
            <button onClick={() => setHealth(0)}>0%</button>
            <button onClick={() => setHealth(20)}>20%</button>
            <button onClick={() => setHealth(50)}>50%</button>
            <button onClick={() => setHealth(75)}>75%</button>
            <button onClick={() => setHealth(100)}>100%</button>
            <div style={{ marginTop: '10px' }}>
                <HealthWidget health={health}/>
            </div>
        </div>
    );
};

storiesOf('Widgets', module)
.add('HealthWidget', () => (<Wrapper/>));
