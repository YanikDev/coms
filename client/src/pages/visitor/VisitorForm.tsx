import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { VisitorFormData, visitorSchema } from "../../schema/visitorSchema";
import { addVisitor } from "../../features/forms/formsSlice";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const VisitorForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VisitorFormData>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      visit_date: new Date(),
      has_commitment: false,
    },
  });

  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fakeUsers = [
      { id: "1", name: "Balu" },
      { id: "2", name: "Prasad" },
      { id: "3", name: "Sai" },
      { id: "4", name: "Amol" },
    ];
    setUsers(fakeUsers);
  }, []);

  const onSubmit = (data: VisitorFormData) => {
    try {
      dispatch(addVisitor(data));
      toast.success("Visitor details submitted successfully!");
      reset();
      navigate("/");
    } catch (err) {
      toast.error("Failed to submit visitor details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Visitor Form
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            {...register("name")}
            className={`w-full px-4 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contact (Phone or Email)
          </label>
          <input
            type="text"
            {...register("contact")}
            className={`w-full px-4 py-2 border ${
              errors.contact ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contact.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-1">
          Visit Date
        </label>
        <input
          type="datetime-local"
          {...register("visit_date", { valueAsDate: true })}
          className={`w-full px-4 py-2 border ${
            errors.visit_date ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.visit_date && (
          <p className="text-red-500 text-sm mt-1">
            {errors.visit_date.message}
          </p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Purpose
          </label>
          <textarea
            rows={3}
            {...register("purpose")}
            className={`w-full px-4 py-2 border ${
              errors.purpose ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          ></textarea>
          {errors.purpose && (
            <p className="text-red-500 text-sm mt-1">
              {errors.purpose.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Outcome / Notes
          </label>
          <textarea
            rows={3}
            {...register("outcome")}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="commitment"
          {...register("has_commitment")}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="commitment" className="text-gray-700">
          Any commitment made?
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition-colors duration-300 border-none"

      >
        Submit
      </button>

      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
};

export default VisitorForm;
