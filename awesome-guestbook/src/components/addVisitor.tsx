import { useState, useEffect } from 'react';
import '../styles/AddVisitor.css';
import { useVisitors } from '../contexts/visitorsContext';
import { v4 as uuidv4 } from 'uuid';
import { Visitor, InputChangeEvent, SetStringState } from '../types/types';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

const AddVisitor = () => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [agreed, setAgreed] = useState<boolean>(false);
    const { visitors, setVisitors } = useVisitors();
    const [emailError, setEmailError] = useState<string | null>(null);

    useEffect(() => {
        const storedVisitors = localStorage.getItem('visitors');
        if (storedVisitors) {
            setVisitors(JSON.parse(storedVisitors));
        }
    }, []);

    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleInputChange = (e: InputChangeEvent, setInput: SetStringState) => {
        setInput(e.target.value);
    };

    const resetForm = () => {
        setFullName('');
        setEmail('');
        setDepartment('');
        setAgreed(false);
        setEmailError(null)
    };

    const handleSubmit = () => {
        if (!fullName && !email && !department) {
            alert("All fields are empty. Please fill out the form.");
            return;
        }
        if (!agreed) {
            alert("You must agree before adding.");
            return;
        }
        if (!validateEmail(email)) {
            setEmailError("Invalid email format");
            return;
        }
        const newVisitor: Visitor = {
            id: uuidv4(),
            visitor: fullName,
            email: email,
            department: department
        };
        const updatedVisitors = [...visitors, newVisitor];
        setVisitors(updatedVisitors);
        localStorage.setItem('visitors', JSON.stringify(updatedVisitors));
        resetForm()
    };


    return (
        <div className='AddVisitorComponentContainer'>
            <div className='AddVisitorHeadline'>
                <Typography variant="h6">Add new visitor</Typography>
            </div>

            <div className='InputFieldContainer'>
                <TextField
                    label="Full name"
                    id="outlined-size-normal"
                    onChange={(e) => handleInputChange(e, setFullName)}
                    value={fullName}
                    fullWidth
                />
            </div>

            <div className='InputFieldContainer'>
                <TextField
                    type="email"
                    label="Email address"
                    id="outlined-size-normal"
                    onChange={(e) => handleInputChange(e, setEmail)}
                    value={email}
                    helperText={emailError}
                    error={Boolean(emailError)}
                    required
                    fullWidth
                />
            </div>

            <div className='InputFieldContainer'>
                <TextField
                    label="Department"
                    id="outlined-size-normal"
                    onChange={(e) => handleInputChange(e, setDepartment)}
                    value={department}
                    fullWidth
                />
            </div>

            <div>
                <FormControlLabel control={
                    <Checkbox
                        checked={agreed}
                        onChange={() => setAgreed(prev => !prev)}
                    />
                } label="I agree to be added to the table" />
            </div>

            <div className='ButtonsContainer'>
                <Button
                    onClick={() => resetForm()}
                    variant="outlined"
                    sx={{
                        border: ' 1px solid rgba(239, 87, 66, 0.50)',
                        color: '#EF5742',
                        flex: 'none',
                        '&:hover': {
                            borderColor: 'rgba(239, 87, 66, 0.50)',
                            backgroundColor: 'transparent',
                            boxShadow: 'none'
                        }
                    }}
                >
                    Reset form
                </Button>

                <Button
                    onClick={() => handleSubmit()}
                    sx={{
                        backgroundColor: '#EF5742',
                        color: '#fff',
                        width: '100%',
                        '&:hover': {
                            borderColor: 'rgba(239, 87, 66, 0.50)',
                            backgroundColor: '#EF5742',
                        }
                    }}
                    variant="contained"
                >
                    Add new visitor
                </Button>
            </div>
        </div>
    )
}

export default AddVisitor;
