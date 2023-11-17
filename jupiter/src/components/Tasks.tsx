const Tasks = () => {
  return (
    <div className="h-full w-full overflow-y-auto bg-yellow-50/50">
      <ol className="list-none">
        <li className="relative p-3 min-h-[theme(spacing.16)] overflow-hidden border-b border-b-green-900/10 bg-green-50/50">
          <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-green-200/50 leading-none italic select-none">
            1
          </span>
          <div className="relative z-10 text-green-900 prose max-w-none">
            <p>
              Exercitation ad dolore anim duis pariatur ipsum aute do nostrud irure eiusmod est mollit aute officia.
            </p>
            <pre>const a = 1;</pre>
          </div>
        </li>
        <li className="relative py-2 px-3 min-h-[theme(spacing.16)] overflow-hidden border-b border-b-red-900/10 bg-red-50/50">
          <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-red-200/50 leading-none italic select-none">
            2
          </span>
          <div className="relative z-10 text-red-900 prose max-w-none">
            <pre>const a = 1;</pre>
            <p>Ipsum dolore ullamco eiusmod officia in aute fugiat nisi excepteur cupidatat elit aliqua laboris.</p>
          </div>
        </li>
        <li className="relative py-2 px-3 min-h-[theme(spacing.16)] overflow-hidden border-b border-b-yellow-900/10">
          <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-yellow-200/50 leading-none italic select-none">
            3
          </span>
          <div className="relative z-10 text-yellow-900 prose max-w-none">
            <p>
              Exercitation velit irure <code>excepteur</code> enim aliquip eiusmod veniam do sint ipsum pariatur commodo
              irureesse do.
            </p>
          </div>
        </li>
        <li className="relative py-2 px-3 min-h-[theme(spacing.16)] overflow-hidden border-b border-b-yellow-900/10">
          <span className="text-[6.25rem] font-extrabold absolute -top-5 -left-2 text-yellow-200/50 leading-none italic select-none">
            4
          </span>
          <div className="relative z-10 text-yellow-900 prose max-w-none">
            <p>Lorem ullamco Lorem ea.</p>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default Tasks;
