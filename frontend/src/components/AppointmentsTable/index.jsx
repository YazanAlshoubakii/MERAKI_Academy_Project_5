import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { deleteAppointment } from '../../service/api/deleteAppointment';
import { updateAppointment } from '../../service/api/updateAppointment';
import ErrorPage from '../Pages/ErrorPage';
import Loading from '../Pages/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import {
  deleteAppointments,
  updateAppointments,
} from '../../service/redux/reducers/AppointmentsTableUser';

export default function IconBoxStyle12() {
  const data = useSelector((store) => store.appointments.appointment);
  const dispatch = useDispatch();
  console.log(data);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);

  const deleteHandler = async (appointment_id) => {
    setLoading(true);
    setError(null);

    try {
      await deleteAppointment(appointment_id);
      dispatch(deleteAppointments(appointment_id));
    } catch (err) {
      setError(err.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const updateHandler = async (appointment_id) => {
    setLoading(true);
    setError(null);

    try {
      if (!selectedDate || !selectedTime) {
        throw new Error('Date and time must be selected');
      }

      const formattedDate = format(new Date(selectedDate), 'yyyy-MM-dd');
      const new_time = `${formattedDate} ${selectedTime}:00`;

      const updatedAppointment = await updateAppointment(
        appointment_id,
        new_time
      );

      dispatch(updateAppointments(updatedAppointment));
      setShowModal(false); // Close the modal after updating
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const openUpdateModal = (appointment_id) => {
    setCurrentAppointmentId(appointment_id);
    setShowModal(true);
  };

  const updateModal = () => (
    <div
      className="modal"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
    >
      {loading && (
        <Loading
          customStyle={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      {error && <ErrorPage message={error} />}
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close btn btn-primary"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h1>Update Appointment</h1>
            <div
              className="cs_with_icon_input"
              style={{ zIndex: '999', backgroundColor: '#fff' }}
            >
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                isClearable
                placeholderText="dd/mm/yyyy"
                style={{ backgroundColor: '#fff' }}
              />
              <i>
                <Icon icon="fa6-solid:calendar-days" />
              </i>
              <div className="cs_height_42 cs_height_xl_25" />
            </div>
            <div className="cs_with_icon_input">
              <input
                type="time"
                className="cs_form_field cs_timepicker"
                placeholder="10:00"
                onChange={(e) => setSelectedTime(e.target.value)}
                value={selectedTime}
              />
              <i>
                <Icon icon="fa6-regular:clock" />
              </i>
            </div>
            <div className="cs_height_42 cs_height_xl_25" />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => updateHandler(currentAppointmentId)}
            >
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showModal && updateModal()}
      {data?.map((item, index) => (
        <div key={index}>
          <div
            className="cs_iconbox_info cs_radius_20"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <div style={{ position: 'relative' }}>
              <span className="cs_iconbox_circle cs_accent_bg" />
              <h4>
                Date: {format(new Date(item.time), 'yyyy-MM-dd')}
                <br />
                Time: {format(new Date(item.time), 'HH:mm')}
              </h4>
              <h2 className="cs_iconbox_title cs_fs_32 cs_semibold">
                <span>{item.department_name}</span>
              </h2>
              <p className="cs_iconbox_subtitle mb-0 cs_heading_color">
                {item.notes}
              </p>
              <span></span>
            </div>
            <div style={{ alignSelf: 'end' }}>
              <button
                className="cs_iconbox_icon cs_center"
                style={{
                  width: '50px',
                  height: '40px',
                  fontSize: '30px',
                  borderRadius: '11px',
                  padding: '0 5px',
                  marginBottom: '10px',
                  border: '0',
                  outline: '0',
                  color: '#FFF',
                  backgroundColor: '#2196F3',
                }}
                onClick={() => openUpdateModal(item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9 15v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zm10.6-9.2l1.425-1.4l-1.4-1.4L18.2 4.4zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925L7 9.925V17h7.05L21 10.05V19q0 .825-.587 1.413T19 21z"
                  />
                </svg>
              </button>
              <button
                id={item.id}
                className="cs_iconbox_icon cs_center"
                onClick={() => deleteHandler(item.id)}
                style={{
                  width: '50px',
                  height: '40px',
                  fontSize: '30px',
                  borderRadius: '11px',
                  padding: '0 5px',
                  border: '0',
                  outline: '0',
                  color: '#FFF',
                  backgroundColor: 'rgb(243 86 86)',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17zm4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="cs_height_42 cs_height_lg_25" />
        </div>
      ))}
    </>
  );
}
