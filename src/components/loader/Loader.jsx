import { Component } from 'react';
import { RingLoader } from './Loader.module';


 export class Loader extends Component {
    
    render() { 
        return (
            <RingLoader className="loader" />
        );
    }
  }
   
  export default Loader;