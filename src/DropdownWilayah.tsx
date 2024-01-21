import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsArrowRepeat } from "react-icons/bs";

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
  const [loadingProvince, setLoadingProvince] = useState<boolean>(false);
  const [loadingDistrict, setLoadingDistrict] = useState<boolean>(false);
  const [loadingSubdistrict, setLoadingSubdistrict] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingProvince(true);
        const response = await axios.get(
          "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces", error);
      } finally {
        setLoadingProvince(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        try {
          setLoadingDistrict(true);
          const response = await axios.get(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`
          );
          setDistricts(response.data);
        } catch (error) {
          console.error("Error fetching districts", error);
        } finally {
          setLoadingDistrict(false);
        }
      }
    };

    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchSubdistricts = async () => {
      if (selectedDistrict) {
        try {
          setLoadingSubdistrict(true);
          const response = await axios.get(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedDistrict}.json`
          );
          setSubdistricts(response.data);
        } catch (error) {
          console.error("Error fetching subdistricts", error);
        } finally {
          setLoadingSubdistrict(false);
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
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedDistrict("");
              setSelectedSubdistrict("");
            }}
          >
            <option value="" className="fw-bold">Select Provinces</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
          {loadingProvince && <BsArrowRepeat className="ml-2 animate-spin" />}
        </div>

        {selectedProvince && !loadingProvince && (
          <div className="mb-3">
            <label className="fw-bold d-flex mb-2">Regencies</label>
            <select
              className="form-select"
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedSubdistrict("");
              }}
            >
              <option value="" className="fw-bold">Select Regencies</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {loadingDistrict && <BsArrowRepeat className="ml-2 animate-spin" />}
          </div>
        )}

        {selectedDistrict && !loadingDistrict && (
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
            {loadingSubdistrict && <BsArrowRepeat className="ml-2 animate-spin" />}
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownWilayah;
