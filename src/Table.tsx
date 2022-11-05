import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { CSSProperties } from "react";

const Table = () => {
  // テーブルのスタイル設定
  const border: number = 1;
  const borderCollaps: CSSProperties = {
    borderCollapse: "collapse",
  };
  const thStyle: CSSProperties = {
    minWidth: "150px",
  };

  // モックサーバーのURL
  const membersUrl = "http://localhost:3100/members";

  type Member = {
    id: string;
    name: string;
    age: string;
    note?: string;
  };

  // GETでデータの取り込み、membersにセット
  const [members, setMembers] = useState<Member[]>([]);

  const reloadDB = async () => {
    const response: AxiosResponse<Member[]> = await axios.get(membersUrl);
    setMembers(response.data);
  };

  // 初回データの取り込み、第二引数に[]を指定して最初の一回のみ動作させる
  useEffect(() => {
    reloadDB();
    console.log("初期読込完了！");
  }, []);

  // 再読込の処理
  const loadDB = () => {
    reloadDB();
    alert("再読込しました。");
  };

  const changeName = (e: any, index: number) => {
    const beforeName = [...members];
    beforeName[index].name = e.target.value;
    setMembers(beforeName);
  };

  const changeAge = (e: any, index: number) => {
    const beforeAge = [...members];
    beforeAge[index].age = e.target.value;
    setMembers(beforeAge);
  };

  const changeNote = (e: any, index: number) => {
    const beforeNote = [...members];
    beforeNote[index].note = e.target.value;
    setMembers(beforeNote);
  };

  const updateDB = () => {
    console.log(members);
    for (let i = 0; i < members.length; i++) {
      const id = members[i].id;
      const json = members[i];

      axios.put(membersUrl + "/" + id, json).catch((error) => {
        console.error(error);
      });
    }
    alert("更新完了しました！");
  };

  return (
    <div>
      <button onClick={() => loadDB()}>DB読込</button>
      <button onClick={() => updateDB()}>DB更新</button>
      <table border={border} style={borderCollaps}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>Note</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member: Member, index: number) => (
            <tr key={index}>
              <td>{member.id}</td>
              <td>
                <input
                  value={member.name}
                  onChange={(e) => changeName(e, index)}
                />
              </td>
              <td>
                <input
                  value={member.age}
                  onChange={(e) => changeAge(e, index)}
                />
              </td>
              <td>
                <input
                  value={member.note}
                  onChange={(e) => changeNote(e, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
