import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addMeeting } from "../../features/forms/meetingSlice";
import { users } from "../../constants/users";
import { MeetingFormData, meetingSchema } from "../../schema/meetingSchema";

const MeetingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingSchema),
  });

  const onSubmit = (data: MeetingFormData) => {
    dispatch(addMeeting(data));
    reset();
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-6"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Meeting Form
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Date
          </label>
          <input
            type="date"
            {...register("date")}
            className={`w-full border rounded px-3 py-2 ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date && (
            <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Type
          </label>
          <select
            {...register("type")}
            defaultValue=""
            className={`w-full border rounded px-3 py-2 ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="virtual">Virtual</option>
            <option value="physical">Physical</option>
          </select>
          {errors.type && (
            <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Agenda / Subject
          </label>
          <input
            type="text"
            {...register("agenda")}
            className={`w-full border rounded px-3 py-2 ${
              errors.agenda ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.agenda && (
            <p className="text-sm text-red-500 mt-1">{errors.agenda.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            MoM - Discussed Points
          </label>
          <textarea
            rows={3}
            {...register("mom")}
            className={`w-full border rounded px-3 py-2 ${
              errors.mom ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {errors.mom && (
            <p className="text-sm text-red-500 mt-1">{errors.mom.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Action Points
          </label>
          <textarea
            rows={3}
            {...register("actionPoints")}
            className={`w-full border rounded px-3 py-2 ${
              errors.actionPoints ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {errors.actionPoints && (
            <p className="text-sm text-red-500 mt-1">
              {errors.actionPoints.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
          Assign to Officer
        </label>
        <select
          {...register("assignedTo")}
          defaultValue=""
          className={`w-full border rounded px-3 py-2 ${
            errors.assignedTo ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="" disabled>
            Select Officer
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.assignedTo && (
          <p className="text-sm text-red-500 mt-1">
            {errors.assignedTo.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition-colors duration-300 border-none"
      >
        Submit Meeting
      </button>
    </form>
  );
};

export default MeetingForm;

