import { useState } from "react";
import { Lnb, CurrentBox, CheckBox } from "../../components/bundle_components";
import { useSelectBox, useDatePicker } from "../../hooks/bundle_hooks";
import { useNavigate } from "react-router-dom";

export default function Stamp() {
  const { date, startDate, endDate } = useDatePicker();

  const { selectedValues, selecBoxHtml } = useSelectBox({
    pay_state1: ["전체", "적립중", "적립중지", "적립종료"],
    pay_state2: ["전체", "적립중", "적립중지", "적립종료"],
  });

  return (
    <>
      <Lnb lnbType="accumulated" />
      {/* <CurrentBox add={true} del={true} down={true} tit="도장 관리" /> */}
      <CurrentBox btns={["add", "del", "down"]} tit="도장 관리" />
      <div className="stamp box_ty01 table_type table_comm accumulated">
        <div className="filter_wrap d-flex">
          <div className="select_input_wrap d-flex">
            <div className="select_input input_ty02">{selecBoxHtml[0]}</div>
          </div>
          <div className="date_input_wrap d-flex">
            <div className="date_input input_ty02">{date.start}</div>
            <div className="date_input input_ty02">{date.end}</div>
          </div>
          <button type="button" className="btn_ty01 btn_search">
            검색
          </button>
        </div>
        <div className="table_wrap line">
          <table className="table" id="table">
            <colgroup>
              <col width={"80px"} />
              <col width={"80px"} />
              <col width={"130px"} />
              <col width={"120px"} />
              <col width={"130px"} />
              <col width={"120px"} />
              <col width={"300px"} />
              <col width={"150px"} />
              <col width={"200px"} />
            </colgroup>
            <thead>
              <tr>
                <th className="check">
                  <CheckBox for="wr_all" id="wr_all" name="wr_all" />
                </th>
                <th className="num">NO</th>
                <th colSpan={4}>도장 적립 정책</th>
                <th>적립 기한</th>
                <th>적립 상태</th>
                <th className="etc">비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="check">
                  <CheckBox for="wr_1" id="wr_1" name="wr_1" />
                </td>
                <td className="num"></td>
                <td>글 등록 개수</td>
                <td className="input_ty02">
                  <input type="text" placeholder="직접입력" />
                </td>
                <td>도장 적립 개수</td>
                <td className="input_ty02">
                  <input type="text" placeholder="직접입력" />
                </td>
                <td>
                  <div className="date_input_wrap d-flex">
                    <div className="date_input input_ty02">{date.start}</div>
                    <span className="wave">~</span>
                    <div className="date_input input_ty02">{date.end}</div>
                  </div>
                </td>
                <td>
                  <div className="select_input_wrap d-flex">
                    <div className="select_input input_ty02">{selecBoxHtml[1]}</div>
                  </div>
                </td>
                <td className="etc input_ty02">
                  <input type="text" placeholder="직접입력" />
                </td>
              </tr>
              <tr>
                <td className="check">
                  <CheckBox for="wr_2" id="wr_2" name="wr_2" />
                </td>
                <td className="num">2</td>
                <td>글 등록 개수</td>
                <td>1</td>
                <td>도장 적립 개수</td>
                <td>1</td>
                <td>
                  <div className="date_input_wrap d-flex">
                    <div className="date_input input_ty02">{date.start}</div>
                    <span className="wave">~</span>
                    <div className="date_input input_ty02">{date.end}</div>
                  </div>
                </td>
                <td>적립중지</td>
                <td className="etc input_ty02">
                  <input type="text" placeholder="직접입력" />
                </td>
              </tr>
              <tr>
                <td className="check">
                  <CheckBox for="wr_3" id="wr_3" name="wr_3" />
                </td>
                <td className="num">1</td>
                <td>글 등록 개수</td>
                <td>2</td>
                <td>도장 적립 개수</td>
                <td>1</td>
                <td>
                  <div className="date_input_wrap d-flex">
                    <div className="date_input input_ty02">{date.start}</div>
                    <span className="wave">~</span>
                    <div className="date_input input_ty02">{date.end}</div>
                  </div>
                </td>
                <td>적립중</td>
                <td className="etc input_ty02">
                  <input type="text" placeholder="직접입력" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
