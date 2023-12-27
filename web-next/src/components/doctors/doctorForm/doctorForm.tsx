import { Input } from "@nextui-org/react";

type Props = {

}

const DoctorForm = (props: Props) => {

    /**
     * Handle input change
     * 
     * @param inputType string
     * @param event HTML input element event
     */
    const handleInputChange = (inputType: string, event: React.FormEvent<HTMLInputElement>) => {

    }

    return (
        <>
            {/* Address */}
            <div className="flex pb-4 gap-4">
                {/* street */}
                <div className="w-1/2">
                    <Input type="text"
                        id="street1"
                        aria-describedby="Street input"
                        placeholder="Street"
                        color="primary"
                        variant="bordered"
                        onChange={(e) => handleInputChange('address1', e)} />
                </div>

                {/* City */}
                <div className="w-1/2">
                    <Input type="text"
                        id="address2"
                        aria-describedby="City input"
                        placeholder="City"
                        color="primary"
                        variant="bordered"
                        onChange={(e) => handleInputChange('address2', e)} />
                </div>
            </div >

        </>
    )
}

export default DoctorForm;