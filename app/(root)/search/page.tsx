import UserCard from '@/components/cards/UserCard';
import Pagination from '@/components/shared/Pagination';
import Searchbar from '@/components/shared/Searchbar';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const { users, isNext } = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });
  return (
    <>
      <section>
        <h1 className="head-text mb-10">Search</h1>
        <Searchbar routeType="search" />
        <div className="mt-14 flex flex-col gap-9">
          {users.length === 0 ? (
            <p className="no-result">No Result</p>
          ) : (
            <>
              {users.map(person => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                />
              ))}
            </>
          )}
        </div>
      </section>
      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </>
  );
};

export default SearchPage;
