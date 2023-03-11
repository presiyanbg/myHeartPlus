import { useEffect, useState } from "react";
import { DoctorType } from "../../../ts/types";
import { useTranslation } from 'react-i18next';

type Props = {
  doctor: DoctorType | any,
}

const DoctorProfile = (props: Props) => {
  const [doctor, setDoctor] = useState<DoctorType>();

  const { t } = useTranslation();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

  }

  const handleInputChange = (inputType: string, event: React.FormEvent<HTMLInputElement>) => {

  }

  useEffect(() => {
    if (!props?.doctor) return;

    setDoctor(props.doctor);
  }, [props]);

  if (!doctor || !props?.doctor) return <></>

  return (
    <div className="col-12">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-2"></div>

          {/* Information */}
          <div className="col-12 col-lg-4">
            <div className="row mb-3">
              <div className="col-12">
                <h6>{t('Information')}</h6>
              </div>
            </div>

            {/* Specialty */}
            <div className="row mb-3">
              <div className="col-12 mb-3">
                <div className="form-floating">
                  <select id="specialty"
                    className="form-select form-select-lg"
                    aria-label="Specialty">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>

                  <label htmlFor="specialty">{t('Specialty')}</label>
                </div>
              </div>
            </div>

            {/* Mobile number */}
            <div className="row mb-3">
              <div className="col-12 mb-3">
                <div className="form-floating">
                  <input type="text"
                    id="mobile_number"
                    value={doctor?.mobile_number}
                    placeholder={doctor?.mobile_number}
                    className="form-control"
                    onChange={(e) => handleInputChange('mobile_number', e)} />

                  <label htmlFor="mobile_number">{t('Mobile number')}</label>
                </div>
              </div>
            </div>

            {/* Office number */}
            <div className="row mb-3">
              <div className="col-12 mb-3">
                <div className="form-floating">
                  <input type="text"
                    id="office_number"
                    value={doctor?.office_number}
                    placeholder={doctor?.office_number}
                    className="form-control"
                    onChange={(e) => handleInputChange('office_number', e)} />

                  <label htmlFor="office_number">{t('Office number')}</label>
                </div>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="col-12 col-lg-4">
            {/* Title */}
            <div className="row mb-3">
              <div className="col-12">
                <h6>{t('Address')}</h6>
              </div>
            </div>

            {/* Address 1 */}
            <div className="row mb-3">
              <div className="col-12 mb-3">
                <div className="form-floating">
                  <input type="text"
                    id="address_1"
                    value={doctor?.address_1}
                    placeholder={doctor?.address_1}
                    className="form-control"
                    onChange={(e) => handleInputChange('address_1', e)} />

                  <label htmlFor="address_1">{t('Address')} 1</label>
                </div>
              </div>
            </div>

            {/* Address 2 */}
            <div className="row mb-3">
              <div className="col-12 mb-3">
                <div className="form-floating">
                  <input type="text"
                    id="address_2"
                    value={doctor?.address_2}
                    placeholder={doctor?.address_2}
                    className="form-control"
                    onChange={(e) => handleInputChange('address_2', e)} />

                  <label htmlFor="address_2">{t('Address')} 2</label>
                </div>
              </div>
            </div>

            {/* Address 3 */}
            <div className="row mb-3">
              <div className="col-12 mb-3">
                <div className="form-floating">
                  <input type="text"
                    id="address_3"
                    value={doctor?.address_3}
                    placeholder={doctor?.address_3}
                    className="form-control"
                    onChange={(e) => handleInputChange('address_3', e)} />

                  <label htmlFor="address_3">{t('Address')} 3</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* City and county */}
        <div className="row mb-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 mb-3">
              <h6>{t('Location')}</h6>
            </div>
          </div>

          <div className="col-12">
            <div className="row justify-content-center">
              {/* Address 4 */}
              <div className="col-12 col-lg-4 mb-3">
                <div className="form-floating">
                  <input type="text"
                    id="address_4"
                    value={doctor?.address_4}
                    aria-describedby="emailHelp"
                    placeholder={doctor?.address_4}
                    className="form-control"
                    onChange={(e) => handleInputChange('address_4', e)} />

                  <label htmlFor="address_4">{t('City')}</label>
                </div>
              </div>

              {/* Address 5 */}
              <div className="col-12 col-lg-4 mb-3">
                <div className="form-floating">
                  <input type="text"
                    id="address_5"
                    value={doctor?.address_5}
                    placeholder={doctor?.address_5}
                    className="form-control"
                    onChange={(e) => handleInputChange('address_5', e)} />

                  <label htmlFor="address_5">{t('County')}</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="row">
          <div className="col-12">
            <div className="row justify-content-center">
              <div className="col-4"></div>

              <div className="col-4">
                <button type="submit" className="btn btn-success text-white w-100">
                  {t('Update')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default DoctorProfile;