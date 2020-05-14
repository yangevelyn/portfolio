import React, {Component} from 'react'
import {motion} from 'framer-motion'

export class Header extends Component{
    render(){
        return(
            <motion.h1
                initial={{ opacity: 0.75 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.5 },
                }}
                whileTap={{ scale: 0.95 }}
                >
                <a href="./index.html">
                    E.
                </a>
            </motion.h1>
        );
    }
}

export default Header;