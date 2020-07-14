import {Bar,Chart} from 'react-chartjs-2';
import React from 'react';
class BarChart extends React.Component {

    render() {

        return (
            
            <div>
                <Bar data={this.props.data}
                 width={100}
                 height={500}
                options={{ responsive: true ,maintainAspectRatio:false}} redraw={true} ></Bar>
            </div>

        )  

 } 
}

export default BarChart;