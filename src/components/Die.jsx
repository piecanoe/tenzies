import React from 'react'

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#C9B3D1' : 'white'
    }

    return (
        <div 
            onClick={props.holdDice}
            className='die'
            style={styles}
        >
            <h2 className='die-num'>{props.value}</h2>
        </div>
    )

}