import React, {Component} from 'react'
import {motion} from 'framer-motion'

export class Tab extends Component {
    addStyling = () => {
        if(this.props.tab.id == this.props.activeTab){
            return {color: 'rgb(250, 169, 8)'}
        } else{
            return {color: 'black'}
        }
    }
    render() {
        return (
            <motion.div className="tab"
                initial={{ opacity: 0.75}}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.5 },
                }}
                whileTap={{ scale: 0.95 }}
                style={this.addStyling()}
                onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
                <h2>{this.props.tab.title}</h2>
            </motion.div>
        );
    }
}

export default Tab;