import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lnb,
  CurrentBox,
  CheckBox,
  Pagination,
  RadioBtn,
} from "../../components/bundle_components";
import {
  useSelectBox,
  useDatePicker,
  useCheckToken,
} from "../../hooks/bundle_hooks";

export default function Tip() {
  const navigate = useNavigate();
  const { mb_no, postData, resData, setResData } = useCheckToken();
  const { date, start_at, end_at } = useDatePicker();
  const { selectedValues, selecBoxHtml } = useSelectBox({
    signUp_date: ["최근 등록일 순", "오래된 등록일 순"],
    open_state: ["전체", "공개", "비공개"],
  });
  const [pageData, setPageData] = useState();
  const [checkedList, setCheckedList] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [beforeFilter, setBeforeFilter] = useState();
  const [modList, setModeList] = useState({
    wr_id: [],
    wr_status: [],
    wr_memo: [],
  });

  const checkAll = (e) => {
    if (e.target.checked)
      setCheckedList(resData.boardInfo.map((el) => el.wr_id));
    else setCheckedList([]);
  };

  const loadPostData = async () => {
    const category = "tip";
    const wr_status = { 전체 : "0,1", 공개: 0, 비공개: 1 }[selectedValues.open_state];
    const order =
      selectedValues.signUp_date === "최근 등록일 순" ? "desc" : "asc";
    const data = {
      mb_no,
      start_at,
      end_at,
      category,
      wr_status,
      order,
    };
    const res = await postData("community/index", { ...data });
    if (!res || res?.code !== 200) return;
    setBeforeFilter({ ...data });
    setPageData(res.page);
    setCurPage(1);
    if (!res.data) setResData([]);
  };

  const loadPageData = async (page) => {
    const res = await postData("community/index", {
      ...beforeFilter,
      cur_page: page,
    });
    setPageData(res.page);
  };

  const modPostData = async (type) => {
    await postData("community/edit", {
      mb_no,
      type,
      wr_subject: "tip",
      ...modList,
    });
    loadPostData();
    setCheckedList([]);
  };

  const btnEvent = {
    add() {
      navigate("/Tip/add");
    },
    mod() {
      modPostData("edit");
    },
    del() {
      if(checkedList.length > 0)
      {
        if(window.confirm("삭제 하시겠습니까?"))
        {
          modPostData("delete");
        }
      }  
      else
      {
        alert("1개 이상 선택을 해주세요.");
      }
    },
  };

  useEffect(() => {
    loadPostData();
  }, []);

  return (
    <>
      <Lnb lnbType="board" />
      <CurrentBox
        btns={["add",  "del"]}
        tit="탄소중립 TIP 자료실 리스트"
        {...btnEvent}
      />
      <div className="tip box_ty01 table_type table_comm">
        <div className="filter_wrap d-flex">
          <div className="select_input_wrap d-flex">{selecBoxHtml}</div>
          <div className="date_input_wrap d-flex">
            <div className="date_input input_ty02">{date.start}</div>
            <div className="date_input input_ty02">{date.end}</div>
          </div>
          <button
            type="button"
            className="btn_ty01 btn_search"
            onClick={loadPostData}
          >
            검색
          </button>
        </div>
        <div className="table_wrap line part">
          <table className="table" id="table">
            <colgroup>
              <col width={"auto"} />
              <col width={"80px"} />
              <col width={"450px"} />
              <col width={"150px"} />
              <col width={"100px"} />
              <col width={"145px"} />
              <col width={"230px"} />
            </colgroup>
            <thead>
              <tr>
                <th className="check">
                  <CheckBox
                    for="wr_all"
                    id="wr_all"
                    name="wr_all"
                    checked={resData?.boardInfo.length === checkedList.length}
                    onClick={checkAll}
                  />
                </th>
                <th className="num">NO</th>
                <th>제목</th>
                <th>등록일</th>
                <th>상태</th>
                <th>상태설정</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {resData?.boardInfo.map((el, idx) => {
                return (
                  <PostItem
                    key={idx}
                    data={el}
                    checkedList={checkedList}
                    setCheckedList={setCheckedList}
                    modList={modList}
                    setModeList={setModeList}
                    num={idx}
                    pageData={pageData}
                  />
                );
              })}
            </tbody>
          </table>
          {!resData?.boardInfo[0] && (
            <div className="no_data_wrap">데이터 없음</div>
          )}
        </div>
        <CurrentBox
          btns={["add",  "del"]}
          hideTit={true}
          setCurPage={setCurPage}
          {...btnEvent}
        />
        {pageData && (
          <Pagination
            pageData={pageData}
            curPage={curPage}
            setCurPage={setCurPage}
            onClick={loadPageData}
          />
        )}
      </div>
    </>
  );
}

function PostItem({
  data,
  checkedList,
  setCheckedList,
  modList,
  setModeList,
  num,
  pageData,
}) {
  const navigate = useNavigate();
  const [postContents, setPostContents] = useState({
    wr_id: data.wr_id,
    wr_status: data.wr_status,
    wr_memo: data.wr_memo,
  });

  const checkItem = (e) => {
    if (e.target.checked) setCheckedList([...checkedList, data.wr_id]);
    else setCheckedList([...checkedList].filter((el) => el !== data.wr_id));
  };

  const handlePostContents = (e) => {
    const type = e.target.dataset.type;
    const value = e.target.dataset.value || e.target.value;
    let copy = { ...postContents };
    copy[type] = value;
    setPostContents(copy);
  };

  const modData = () => {
    let copy = { ...modList };
    if (!checkedList.includes(data.wr_id)) {
      if (copy.wr_id.includes(data.wr_id)) {
        const idx = copy.wr_id.indexOf(data.wr_id);
        ["wr_id", "wr_status", "wr_memo"].forEach((el) => {
          copy[el].splice(idx, 1);
        });
        return setModeList(copy);
      }
      return;
    }
    if (copy.wr_id.includes(data.wr_id)) {
      const idx = copy.wr_id.indexOf(data.wr_id);
      ["wr_id", "wr_status", "wr_memo"].forEach((el) => {
        copy[el].splice(idx, 1);
        copy[el].push(postContents[el]);
      });
    } else {
      ["wr_id", "wr_status", "wr_memo"].forEach((el) => {
        copy[el].push(postContents[el]);
      });
    }
    setModeList(copy);
  };

  useEffect(() => {
    modData();
  }, [checkedList, postContents]);

  useEffect(() => {
    setPostContents({ ...data });
  }, [data]);

  return (
    <tr>
      <td className="check">
        <CheckBox
          for={data.wr_id}
          id={data.wr_id}
          name={data.wr_id}
          checked={checkedList.includes(data.wr_id)}
          onClick={checkItem}
        />
      </td>
      <td className="num"
       onClick={() => {
        navigate("/Tip/Edit", {
          state: { wr_subject: data.wr_subject, wr_id: data.wr_id },
        });
      }}>
        {pageData.offset + num + 1}</td>
      <td
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/Tip/Edit", {
            state: { wr_subject: data.wr_subject, wr_id: data.wr_id },
          });
        }}
      >
        {data.wr_seo_title}
      </td>
      <td
       onClick={() => {
        navigate("/Tip/Edit", {
          state: { wr_subject: data.wr_subject, wr_id: data.wr_id },
        });
      }}
      >{data.wr_datetime.replace(/-/g, ".")}</td>
      <td
       onClick={() => {
        navigate("/Tip/Edit", {
          state: { wr_subject: data.wr_subject, wr_id: data.wr_id },
        });
      }}
      >{data.wr_status === 0 ? "공개" : "비공개"}</td>
      <td>
        <div className="radio_group">
          <div className="radio_wrap">
            {[
              ["공개", "show", 0],
              ["비공개", "hide", 1],
            ].map((el, idx) => {
              return (
                <RadioBtn
                  key={idx}
                  for={el[1] + data.wr_id}
                  id={el[1] + data.wr_id}
                  name={"isShow" + data.wr_id}
                  checked={postContents.wr_status == el[2]}
                  text={el[0]}
                  dataType={"wr_status"}
                  dataValue={el[2]}
                  onClick={handlePostContents}
                  disabled={true}
                />
              );
            })}
          </div>
        </div>
      </td>
      <td>
        <div className="input_ty02">
          <input
            type="text"
            placeholder={""}
            value={postContents.wr_memo}
            data-type="wr_memo"
            onChange={handlePostContents}
            disabled={true}
          />
        </div>
      </td>
    </tr>
  );
}
