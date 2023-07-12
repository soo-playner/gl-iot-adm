import { Link, useParams } from "react-router-dom";
import { Lnb, CurrentBox, CheckBox, Pagination, RadioBtn } from "../../components/bundle_components";
import { useSelectBox, useDatePicker } from "../../hooks/bundle_hooks";

export default function News() {
  const { id } = useParams();
  const { date, startDate, endDate } = useDatePicker();
  const { selectList, selecBoxHtml } = useSelectBox({
    signUp_date: ["최근 등록일 순", "오래된 등록일 순"],
    division_sort: ["구분", "이벤트", "뉴스"],
    open_state: ["공개여부", "공개", "비공개"],
  });

  return (
    <>
      <Lnb lnbType="board" />
      <CurrentBox add={true} mod={true} del={true} down={true} tit="이벤트/뉴스 리스트" />
      <div className="news box_ty01 table_type table_comm">
        <div className="filter_wrap d-flex">
          <div className="select_input_wrap d-flex">{selecBoxHtml}</div>
          <div className="date_input_wrap d-flex">
            <div className="date_input input_ty02">{date.start}</div>
            <div className="date_input input_ty02">{date.end}</div>
          </div>
          <button type="button" className="btn_ty01 btn_search">
            검색
          </button>
        </div>
        <div className="table_wrap line part">
          <table className="table">
            <colgroup>
              <col width={"auto"} />
              <col width={"80px"} />
              <col width={"120px"} />
              <col width={"400px"} />
              <col width={"150px"} />
              <col width={"240px"} />
              <col width={"100px"} />
              <col width={"250px"} />
            </colgroup>
            <thead>
              <tr>
                <th className="check">
                  <CheckBox for="wr_all" id="wr_all" name="wr_all" />
                </th>
                <th className="num">NO</th>
                <th>구분</th>
                <th>제목</th>
                <th>등록일</th>
                <th>공개여부</th>
                <th>종료여부</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="check">
                  <CheckBox for="wr_1_1" id="wr_1_1" name="wr_1" />
                </td>
                <td className="num">2</td>
                <td>이벤트</td>
                <td>
                  <Link to={"/News/NewsDetail/" + id}>신규 가입 이벤트 진행</Link>
                </td>
                <td>2023.05.01</td>
                <td>
                  <div className="radio_group">
                    <div className="radio_wrap">
                      <RadioBtn for="show01" id="show01" name="show" text="공개" />
                      <RadioBtn for="noshow01" id="noshow01" name="show" text="비공개" />
                    </div>
                  </div>
                </td>
                <td>
                  <CheckBox for="wr_1_2" id="wr_1_2" name="wr_1" />
                </td>
                <td>
                  <div className="input_ty02">
                    <input type="text" placeholder={"직접 입력"} />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="check">
                  <CheckBox for="wr_2_1" id="wr_2_1" name="wr_2" />
                </td>
                <td className="num">1</td>
                <td>뉴스</td>
                <td>신규 가입 이벤트 진행</td>
                <td>2023.05.01</td>
                <td>
                  <div className="radio_group">
                    <div className="radio_wrap">
                      <RadioBtn for="show02" id="show02" name="show02" text="공개" />
                      <RadioBtn for="noshow02" id="noshow02" name="show02" text="비공개" />
                    </div>
                  </div>
                </td>
                <td>
                  <CheckBox for="wr_2_2" id="wr_2_2" name="wr_2" />
                </td>
                <td>
                  <div className="input_ty02">
                    <input type="text" placeholder={"직접 입력"} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CurrentBox add={true} mod={true} del={true} down={true} hideTit={true} />
        <Pagination />
      </div>
    </>
  );
}
