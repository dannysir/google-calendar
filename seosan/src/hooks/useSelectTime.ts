import {useState} from "react";

export const useSelectTime = (start :number, end :number) => {
    const [selectedStart, setSelectedStart] = useState<number>(start);
    const [selectedEnd, setSelectedEnd] = useState<number>(end);

    const handleStartTimeSelect = (hour: number) => {
        if (hour >= selectedEnd) {
            setSelectedStart(hour);
            setSelectedEnd(hour + 1);
        }else setSelectedStart(hour);
    };

    const handleEndTimeSelect = (hour: number) => {
        if (hour <= selectedStart) {
            setSelectedStart(hour - 1);
            setSelectedEnd(hour);
        } else setSelectedEnd(hour);
    };

    return {selectedStart, selectedEnd, handleStartTimeSelect, handleEndTimeSelect}
};