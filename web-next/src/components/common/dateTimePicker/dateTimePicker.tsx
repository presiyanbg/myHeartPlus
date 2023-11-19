'use client';
import { useEffect, useState } from "react";

type Props = {
    title: string,
    selectedDate?: string,
    handleDateChange: (date: string) => void
}

const DateTimePicker = (props: Props) => {
    const [selectedDate, setSelectedDate] = useState<string>('');

    /**
     * Handle change
     * 
     * @param event Input change event
     * @returns void
     */
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        // Save changed date
        if (!event?.currentTarget?.value) return;

        setSelectedDate(event.currentTarget.value);

        // Return changed date
        if (!props?.handleDateChange) return;

        props.handleDateChange(selectedDate);
    }

    // /**
    //  * Format date on props change
    //  */
    // useEffect(() => {
    //     if (!props.selectedDate) return;

    //     setSelectedDate(() => {
    //         return moment(props.selectedDate).format(FORMATS.inputDate);
    //     });
    // }, [props]);

    return (
        <div className="form-group">
            <div className="form-floating">
                <input
                    className="form-control"
                    type="date"
                    value={selectedDate}
                    onChange={(event) => handleChange(event)}
                    name='date_of_birth'
                />

                <label htmlFor="date">{props.title}</label>
            </div>
        </div>
    )

}

export default DateTimePicker;