import React, { useState } from 'react';

function Form(props) {
    const [formData, updateFormData] = useState(props.lift);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({
            id: formData.id,
            floor: formData.floor,
            passengers: formData.passengers,
            direction: formData.direction,
        }))
        fetch('http://localhost:9000/lift/' + formData.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
            },
            body: JSON.stringify({
                id: formData.id,
                floor: formData.floor,
                passengers: formData.passengers,
                direction: formData.direction,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log('error: ' + err))

    }

    return (
        <div>
            <h5>{formData.id}</h5>
            Floor: <input
                placeholder={formData.floor}
                name="floor"
                onChange={handleChange}
            ></input>
            Passengers: <input
                placeholder={formData.passengers}
                name="passengers"
                onChange={handleChange}
            ></input>
            Direction: <input
                placeholder={formData.direction}
                name="direction"
                onChange={handleChange}
            ></input>
            <button onClick={handleSubmit}>Update</button>
        </div>
    )
}

export default Form
