package codi.backend.domain.member.service;

import codi.backend.domain.member.entity.Member;
import codi.backend.domain.member.entity.Mentor;
import codi.backend.domain.member.entity.Profile;
import codi.backend.domain.member.repository.JpaMemberRepository;
import codi.backend.domain.member.repository.JpaMentorRepository;
import codi.backend.domain.member.repository.JpaProfileRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.NoSuchElementException;

@Service
@Transactional
public class MemberServiceImpl implements MemberService{
    private final JpaMemberRepository memberRepository;
    private final JpaProfileRepository profileRepository;
    private final JpaMentorRepository mentorRepository;

    public MemberServiceImpl(JpaMemberRepository memberRepository, JpaProfileRepository profileRepository, JpaMentorRepository mentorRepository) {
        this.memberRepository = memberRepository;
        this.profileRepository = profileRepository;
        this.mentorRepository = mentorRepository;
    }

    // TODO role 추가 필요
    @Override
    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public Profile createProfile(String memberId, Profile profile) {
        Member member = verifyMember(memberId);
        profile.setMember(member);

        // member에 profile 1:1 연결
        member.setProfile(profile);

        // profile DB 저장
        return profileRepository.save(profile);
    }

    @Override
    public Mentor becomeMentor(String memberId, Mentor mentor) {
        Member member = verifyMember(memberId);
        mentor.setMember(member);

        // member에 mentor 1:1 연결
        member.setMentor(mentor);

        // mentor DB 저장
        return mentorRepository.save(mentor);
    }

    @Override
    public Member findMember(String memberId) {
        return verifyMember(memberId);
    }

    // TODO CustomException 만들어서 따로 정의할 것
    private Member verifyMember(String memberId) {
        return memberRepository.findById(memberId).orElseThrow(NoSuchElementException::new);
    }
}
