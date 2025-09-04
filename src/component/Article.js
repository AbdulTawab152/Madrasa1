export default function Article({ content }) {
    return (
      <div
        dir="rtl"                // برای متن دری راست‌به‌چپ
        style={{ textAlign: 'right', lineHeight: '1.6em' }} 
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    );
  }
  