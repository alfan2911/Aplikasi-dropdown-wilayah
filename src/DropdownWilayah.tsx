import React, { useState, useEffect } from "react";
import axios from "axios";

type Province = {
  id: string;
  name: string;
};

type District = {
  id: string;
  name: string;
};

type Subdistrict = {
  id: string;
  name: string;
};

const DropdownWilayah: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        try {
          const response = await axios.get(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`
          );
          setDistricts(response.data);
        } catch (error) {
          console.error("Error fetching districts", error);
        }
      }
    };

    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchSubdistricts = async () => {
      if (selectedDistrict) {
        try {
          const response = await axios.get(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedDistrict}.json`
          );
          setSubdistricts(response.data);
        } catch (error) {
          console.error("Error fetching subdistricts", error);
        }
      }
    };

    fetchSubdistricts();
  }, [selectedDistrict]);

  return (
    <>
      <div className="container mt-5">
        <div className="mb-3">
          <label className="fw-bold d-flex mb-2">Provinces</label>
          <select
            className="form-select"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="" className="fw-bold">Select Provinces</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="fw-bold d-flex mb-2">Regencies</label>
          <select
            className="form-select"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="" className="fw-bold">Select Regencies</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="fw-bold d-flex mb-2">Subdistricts</label>
          <select
            className="form-select"
            value={selectedSubdistrict}
            onChange={(e) => setSelectedSubdistrict(e.target.value)}
          >
            <option value="" className="fw-bold">Select Subdistricts</option>
            {subdistricts.map((subdistrict) => (
              <option key={subdistrict.id} value={subdistrict.id}>
                {subdistrict.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default DropdownWilayah;
